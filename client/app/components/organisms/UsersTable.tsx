"use client";

import { DataTable, DataTableSortEvent } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "../atoms";
import { UserNameLink } from "../molecules";
import { User } from '../../types/users';

interface UsersTableProps {
  users: User[];
  loading: boolean;
  sortField: string;
  sortOrder: 1 | -1 | null;
  onSort: (event: DataTableSortEvent) => void;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

// Tabla de usuarios con ordenamiento (el paginador está separado)
export function UsersTable({
  users,
  loading,
  sortField,
  sortOrder,
  onSort,
  onEdit,
  onDelete,
}: UsersTableProps) {

  const usuarioBodyTemplate = (rowData: User) => {
    return <UserNameLink name={rowData.usuario} onClick={() => onEdit(rowData)} />;
  };

  const actionBodyTemplate = (rowData: User) => {
    return (
      <Button
        icon="pi pi-trash"
        rounded
        outlined
        severity="danger"
        onClick={() => onDelete(rowData)}
      />
    );
  };

  return (
    <DataTable
      value={users}
      tableStyle={{ minWidth: "60rem" }}
      onSort={onSort}
      sortField={sortField}
      sortOrder={sortOrder}
      loading={loading}
    >
      <Column field="id" header="id" sortable></Column>
      <Column
        field="usuario"
        header="Usuario"
        sortable
        body={usuarioBodyTemplate}
      ></Column>
      <Column field="estado" header="Estado" sortable></Column>
      <Column field="sector" header="Sector" sortable></Column>
      <Column
        body={actionBodyTemplate}
        exportable={false}
        style={{ minWidth: "8rem" }}
      ></Column>
    </DataTable>
  );
}
