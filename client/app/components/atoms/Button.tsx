import { Button as PrimeButton, ButtonProps } from "primereact/button";

// Botón reutilizable - usa el componente de PrimeReact
export function Button(props: ButtonProps) {
  return <PrimeButton {...props} />;
}
