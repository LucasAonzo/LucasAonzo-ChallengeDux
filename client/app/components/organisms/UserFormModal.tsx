"use client";

import React, { useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import { Input, Dropdown, Button } from "../atoms";
import { FormField } from "../molecules";
import { User } from '../../types/users';
import { logger } from '../../lib/logger';
import { env } from '../../lib/env';

const API_BASE_URL = env.API_BASE_URL;
const API_SECTOR = env.API_SECTOR;

interface UserFormModalProps {
  visible: boolean;
  onHide: () => void;
  userToEdit?: User | null;
  onSave: (user: User) => Promise<void>;
}

// Modal para crear o editar usuarios
export function UserFormModal({
  visible,
  onHide,
  userToEdit,
  onSave,
}: UserFormModalProps) {
  const [formData, setFormData] = useState<Partial<User>>({
    usuario: "",
    estado: undefined,
    sector: parseInt(API_SECTOR, 10),
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const toast = React.useRef<Toast>(null);

  const estados = [
    { label: "Activo", value: "ACTIVO" },
    { label: "Inactivo", value: "INACTIVO" },
  ];

  useEffect(() => {
    if (visible) {
      if (userToEdit) {
        setFormData({
          id: userToEdit.id,
          usuario: userToEdit.usuario,
          estado: userToEdit.estado,
          sector: parseInt(API_SECTOR, 10)
        });
      } else {
        setFormData({
          usuario: "",
          estado: undefined,
          sector: parseInt(API_SECTOR, 10)
        });
      }
      setSubmitted(false);
      setIsSaving(false);
    }
  }, [visible, userToEdit]);

  const handleInputChange = (field: keyof User, value: string | number | null) => {
    setFormData((prev) => ({ ...prev, [field]: value as any }));
  };

  const handleSave = async () => {
    if (isSaving) return;

    setSubmitted(true);
    setIsSaving(true);

    // Validaciones
    if (!formData.usuario?.trim()) {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "El nombre de usuario es requerido"
      });
      setIsSaving(false);
      return;
    }
    if (formData.usuario.trim().length < 3) {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "El nombre de usuario debe tener al menos 3 caracteres"
      });
      setIsSaving(false);
      return;
    }
    if (!formData.estado) {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "El estado es requerido"
      });
      setIsSaving(false);
      return;
    }

    if (!formData.id?.trim()) {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "El ID es requerido"
      });
      setIsSaving(false);
      return;
    }
    if (!/^\d+$/.test(formData.id)) {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "El ID debe ser numérico"
      });
      setIsSaving(false);
      return;
    }

    // Validar ID duplicado: doble chequeo por limitaciones de json-server
    // 1) Chequear en nuestro sector, 2) Chequear globalmente
    if (!userToEdit || formData.id !== userToEdit.id) {
      try {
        const responseInSector = await fetch(`${API_BASE_URL}?sector=${API_SECTOR}&id=${formData.id}`);
        const dataInSector = await responseInSector.json();

        if (Array.isArray(dataInSector) && dataInSector.length > 0) {
          toast.current?.show({
            severity: "error",
            summary: "Error",
            detail: `El ID ya existe en sector ${API_SECTOR}. Por favor, elija otro identificador.`
          });
          setIsSaving(false);
          return;
        }

        const responseGlobal = await fetch(`${API_BASE_URL}/${formData.id}`);
        if (responseGlobal.ok) {
          const globalUser = await responseGlobal.json();
          toast.current?.show({
            severity: "error",
            summary: "Error",
            detail: `El ID ${formData.id} ya está en uso en el sistema (sector ${globalUser.sector}). Por limitación de json-server, debe elegir otro ID.`
          });
          setIsSaving(false);
          return;
        }
      } catch (error) {
        logger.error("Error validating ID", error);
      }
    }

    const userToSave: User = {
      id: formData.id || '',
      usuario: formData.usuario,
      estado: formData.estado,
      sector: parseInt(API_SECTOR, 10)
    };

    onSave(userToSave);
  };

  const footer = (
    <div className="flex justify-content-center gap-2">
      <Button
        label="Confirmar"
        icon="pi pi-check"
        onClick={handleSave}
        disabled={isSaving}
      />
      <Button
        label="Cancelar"
        icon="pi pi-times"
        className="p-button-outlined p-button-primary"
        onClick={onHide}
        disabled={isSaving}
      />
    </div>
  );

  return (
    <>
      <Toast ref={toast} position="bottom-right" />
      <Dialog
        header={
          <div
            style={{
              backgroundColor: "#007ad9",
              color: "white",
              padding: "12px 16px",
              borderRadius: "6px 6px 0 0",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontWeight: "bold",
              fontSize: "16px",
            }}
          >
            <span>Usuario</span>
            <div className="flex gap-2">
              <i className="pi pi-cog" style={{ fontSize: 14, cursor: "pointer" }} />
              <i className="pi pi-minus" style={{ fontSize: 14, cursor: "pointer" }} />
              <i className="pi pi-times" style={{ fontSize: 14, cursor: "pointer" }} onClick={onHide} />
            </div>
          </div>
        }
        visible={visible}
        style={{ width: "1100px" }}
        onHide={onHide}
        footer={footer}
        modal
        draggable={false}
        resizable={false}
        contentStyle={{ padding: 0 }}
        headerStyle={{ padding: 0, border: "none" }}
        closable={false}
      >
        <div style={{ padding: 16 }}>
          <FormField label="ID" htmlFor="id">
            <Input
              id="id"
              value={formData.id || ""}
              onChange={(e) => handleInputChange("id", e.target.value)}
              placeholder="Ingrese el ID numérico del Usuario"
              className={submitted && !formData.id ? "p-invalid" : ""}
            />
          </FormField>

          <FormField label="Nombre" htmlFor="nombre">
            <Input
              id="nombre"
              value={formData.usuario}
              onChange={(e) => handleInputChange("usuario", e.target.value)}
              placeholder="Ingrese el nombre del usuario"
              className={submitted && !formData.usuario ? "p-invalid" : ""}
            />
          </FormField>

          <FormField label="Estado" htmlFor="estado">
            <Dropdown
              id="estado"
              value={formData.estado}
              options={estados}
              onChange={(e) => handleInputChange("estado", e.value)}
              placeholder="Seleccionar el estado"
            />
          </FormField>

          <FormField label="Sector" htmlFor="sector">
            <Input
              id="sector"
              value={API_SECTOR}
              disabled
              className="p-disabled"
            />
          </FormField>
        </div>
      </Dialog>
    </>
  );
}
