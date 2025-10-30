import { Dropdown as PrimeDropdown, DropdownProps } from "primereact/dropdown";

// Dropdown reutilizable
export function Dropdown(props: DropdownProps) {
  return <PrimeDropdown {...props} />;
}
