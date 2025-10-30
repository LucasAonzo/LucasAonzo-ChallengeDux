import React from "react";
import { Dropdown } from "../atoms";

interface FilterDropdownProps {
  value: string | null;
  onChange: (value: string | null) => void;
  options: Array<{ label: string; value: string | null }>;
  placeholder?: string;
}

// Dropdown con opción de limpiar filtro
export function FilterDropdown({
  value,
  onChange,
  options,
  placeholder = "Seleccionar..."
}: FilterDropdownProps) {
  return (
    <Dropdown
      value={value}
      options={options}
      onChange={(e) => onChange(e.value)}
      placeholder={placeholder}
      className="w-full"
      style={{ height: '100%' }}
      showClear
    />
  );
}
