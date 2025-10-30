export interface User {
  id: string;
  usuario: string;
  estado: "ACTIVO" | "INACTIVO";
  sector: number;
}

export type SortOrder = 1 | -1 | null | undefined;