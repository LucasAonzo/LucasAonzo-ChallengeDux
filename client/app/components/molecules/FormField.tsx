import React from "react";
import { Label } from "../atoms";

interface FormFieldProps {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
  error?: string;
  required?: boolean;
}

// Campo de formulario con label y manejo de errores
export function FormField({ label, htmlFor, children, error, required }: FormFieldProps) {
  return (
    <div className="form-group">
      <Label htmlFor={htmlFor}>{label}{required && "*"}:</Label>
      <div className="field">
        {children}
      </div>
      {error && (
        <small style={{ color: "#e24c4c", fontSize: 12 }}>{error}</small>
      )}
    </div>
  );
}
