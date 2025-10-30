import { InputText, InputTextProps } from "primereact/inputtext";

// Input de texto - wrapper de PrimeReact para mantener consistencia
export function Input(props: InputTextProps) {
  return <InputText {...props} />;
}
