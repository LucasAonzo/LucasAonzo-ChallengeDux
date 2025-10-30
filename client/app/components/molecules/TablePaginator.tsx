import React from "react";
import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator";

interface TablePaginatorProps {
  first: number;
  rows: number;
  totalRecords: number;
  rowsPerPageOptions?: number[];
  onPageChange: (event: PaginatorPageChangeEvent) => void;
}

// Paginador separado para usar con las tablas
export function TablePaginator({
  first,
  rows,
  totalRecords,
  rowsPerPageOptions = [10, 20, 30],
  onPageChange,
}: TablePaginatorProps) {
  return (
    <Paginator
      first={first}
      rows={rows}
      totalRecords={totalRecords}
      rowsPerPageOptions={rowsPerPageOptions}
      onPageChange={onPageChange}
    />
  );
}
