"use client";

import { useState, useEffect, useRef } from "react";
import { DataTablePageEvent, DataTableSortEvent } from "primereact/datatable";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import { Button } from "../atoms";
import { TablePaginator } from "../molecules";
import { UsersToolbar, UsersTable, UserFormModal } from "../organisms";
import { User } from '../../types/users';
import { userService } from '../../services/userService';
import { useDebounce } from '../../hooks/useDebounce';
import { logger } from '../../lib/logger';
import { env } from '../../lib/env';

const API_SECTOR = env.API_SECTOR;

interface UsersPageTemplateProps {
  initialUsers: User[];
  initialTotal: number;
}

// Template principal con toda la lógica de CRUD
export function UsersPageTemplate({ initialUsers, initialTotal }: UsersPageTemplateProps) {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [userToEdit, setUserToEdit] = useState<User | null>(null);
  const [globalFilter, setGlobalFilter] = useState("");
  const debouncedFilter = useDebounce(globalFilter, 300);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [totalRecords, setTotalRecords] = useState(initialTotal);
  const [loading, setLoading] = useState(false);
  const [sortField, setSortField] = useState("id");
  const [sortOrder, setSortOrder] = useState<1 | -1 | null>(1);
  const toast = useRef<Toast>(null);

  async function getUsers(
    nameFilter: string,
    status: string | null,
    page: number,
    limit: number,
    sortField: string,
    sortOrder: number | null,
  ) {
    setLoading(true);
    try {
      const { users: data, total } = await userService.getUsers({
        page,
        limit,
        sortField,
        sortOrder,
        query: nameFilter,
        estado: status
      });
      setUsers(data);
      setTotalRecords(total);
    } finally {
      setLoading(false);
    }
  }

  // Evitar refetch mientras hay usuarios temporales (optimistic update en curso)
  useEffect(() => {
    if (!users.some(u => u.id.toString().startsWith('temp-'))) {
      const currentPage = first / rows + 1;
      getUsers(
        debouncedFilter,
        statusFilter,
        currentPage,
        rows,
        sortField,
        sortOrder,
      );
    }
  }, [debouncedFilter, statusFilter, first, rows, sortField, sortOrder]);

  const onPageChange = (event: DataTablePageEvent) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  const onSortChange = (event: DataTableSortEvent) => {
    setSortField(event.sortField);
    setSortOrder(event.sortOrder as 1 | -1 | null);
  };

  const openNew = () => {
    setUserToEdit(null);
    setDialogVisible(true);
  };

  const editUser = (user: User) => {
    setUserToEdit(user);
    setDialogVisible(true);
  };

  const hideDialog = () => {
    setDialogVisible(false);
    setUserToEdit(null);
  };

  const saveUser = async (user: User) => {
    const isEdit = Boolean(userToEdit);
    const previousUsers = [...users];

    try {
      // Optimistic update: mostrar cambio inmediato en UI
      const optimisticUser = isEdit
        ? { ...user }
        : { ...user, id: 'temp-' + Date.now() };

      if (isEdit) {
        setUsers(users.map(u => u.id === userToEdit!.id ? optimisticUser : u));
      } else {
        setUsers([optimisticUser, ...users]);
      }

      hideDialog();

      let savedUser;
      if (isEdit) {
        const idChanged = user.id !== userToEdit!.id;

        // Si cambió el ID: json-server no permite PATCH de ID, hay que crear + borrar
        if (idChanged) {
          try {
            savedUser = await userService.createUser({
              id: user.id,
              usuario: user.usuario,
              estado: user.estado,
              sector: parseInt(API_SECTOR, 10)
            });
            await userService.deleteUser(userToEdit!.id);
          } catch (createError) {
            throw createError;
          }
        } else {
          savedUser = await userService.updateUser(user);
        }
      } else {
        savedUser = await userService.createUser({
          id: user.id,
          usuario: user.usuario,
          estado: user.estado,
          sector: parseInt(API_SECTOR, 10)
        });
      }

      setUsers(currentUsers => {
        if (isEdit) {
          return currentUsers.map(u =>
            (u.id === userToEdit!.id || u.id === savedUser.id) ? savedUser : u
          );
        } else {
          return [savedUser, ...currentUsers.filter(u => !u.id.toString().startsWith('temp-'))];
        }
      });

      toast.current?.show({
        severity: "success",
        summary: "Éxito",
        detail: isEdit ? "Usuario actualizado" : "Usuario creado",
        life: 3000
      });
    } catch (error: any) {
      setUsers(previousUsers);

      logger.error("Failed to save user", {
        message: error?.message,
        status: error?.status,
        response: error?.response,
        stack: error?.stack
      });

      let errorMessage = isEdit
        ? "No se pudo actualizar el usuario. Por favor, intente nuevamente."
        : "No se pudo crear el usuario. Verifique que el nombre de usuario no esté en uso.";

      if (error?.message?.includes('duplicate') || error?.message?.includes('already exists') || error?.message?.includes('unique')) {
        errorMessage = "El ID especificado ya existe. Por favor, elija otro identificador.";
      }

      if (error?.message?.includes('usuario') || error?.status === 409) {
        errorMessage = "El nombre de usuario ya existe. Por favor, elija otro nombre.";
      }

      const debugInfo = error?.message ? `\n\nDetalles técnicos: ${error.message}` : '';

      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: errorMessage + debugInfo,
        life: 5000
      });
    }
  };

  const deleteUser = async (id: string) => {
    const previousUsers = [...users];

    try {
      setUsers(users.filter(u => u.id !== id));
      await userService.deleteUser(id);

      toast.current?.show({
        severity: "success",
        summary: "Éxito",
        detail: "Usuario eliminado",
      });

      setTotalRecords(prev => prev - 1);
    } catch (error) {
      setUsers(previousUsers);
      logger.error("Failed to delete user", error);
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "No se pudo eliminar el usuario",
      });
    }
  };

  const confirmDelete = (user: User) => {
    confirmDialog({
      message: `¿Está seguro que desea eliminar el usuario "${user.usuario}"? Esta acción no se puede deshacer.`,
      header: "Eliminar Usuario",
      icon: "pi pi-exclamation-triangle",
      acceptLabel: "Eliminar",
      rejectLabel: "Cancelar",
      acceptClassName: "p-button-danger",
      rejectClassName: "p-button-text",
      accept: () => deleteUser(user.id),
      reject: () => {},
    });
  };

  return (
    <>
      <Toast ref={toast} position="bottom-right" />
      <ConfirmDialog />

      <div className="flex justify-content-between align-items-center mb-3">
        <h1 style={{ fontWeight: 800, fontSize: "25px" }}>Usuarios</h1>
        <Button label="Nuevo Usuario" icon="pi pi-plus" onClick={openNew} />
      </div>

      <div className="card">
        <UsersToolbar
          globalFilter={globalFilter}
          statusFilter={statusFilter}
          onGlobalFilterChange={setGlobalFilter}
          onStatusFilterChange={setStatusFilter}
        />

        <UsersTable
          users={users}
          loading={loading}
          sortField={sortField}
          sortOrder={sortOrder}
          onSort={onSortChange}
          onEdit={editUser}
          onDelete={confirmDelete}
        />

        <TablePaginator
          first={first}
          rows={rows}
          totalRecords={totalRecords}
          rowsPerPageOptions={[10, 20, 30]}
          onPageChange={onPageChange}
        />
      </div>

      <UserFormModal
        visible={dialogVisible}
        onHide={hideDialog}
        userToEdit={userToEdit}
        onSave={saveUser}
      />
    </>
  );
}
