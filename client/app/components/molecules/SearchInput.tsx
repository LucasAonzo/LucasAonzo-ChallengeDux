import React from "react";
import { Input } from "../atoms";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

// Input con ícono de búsqueda
export function SearchInput({ value, onChange, placeholder = "Buscar..." }: SearchInputProps) {
  return (
    <span className="p-input-icon-left w-full" style={{ height: '100%' }}>
      <i className="pi pi-search" />
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full"
        style={{ height: '100%' }}
      />
    </span>
  );
}
