"use client";

import { SearchInput, FilterDropdown } from "../molecules";

interface UsersToolbarProps {
  globalFilter: string;
  statusFilter: string | null;
  onGlobalFilterChange: (value: string) => void;
  onStatusFilterChange: (value: string | null) => void;
}

// Toolbar con búsqueda y filtro
export function UsersToolbar({
  globalFilter,
  statusFilter,
  onGlobalFilterChange,
  onStatusFilterChange,
}: UsersToolbarProps) {
  const statusOptions = [
    { label: "Activo", value: "ACTIVO" },
    { label: "Inactivo", value: "INACTIVO" },
  ];

  return (
    <div className="flex align-items-center flex-nowrap gap-2 w-full py-3">
      {/* Buscador */}
      <div className="flex-1 min-w-16rem" style={{ height: '42px' }}>
        <span className="p-input-icon-left w-full" style={{ height: '100%' }}>
          <SearchInput
            value={globalFilter}
            onChange={onGlobalFilterChange}
            placeholder="Buscar"
          />
        </span>
      </div>

      {/* Filtro Estado */}
      <div className="flex-1 min-w-14rem" style={{ height: '42px' }}>
        <FilterDropdown
          value={statusFilter}
          onChange={onStatusFilterChange}
          options={statusOptions}
          placeholder="Filtrar por Estado"
        />
      </div>

      {/* Iconos decorativos */}
      <div
        className="flex align-items-center justify-content-center"
        style={{
          width: '42px',
          height: '42px',
          backgroundColor: '#64748B',
          borderRadius: '6px',
          cursor: 'pointer'
        }}
      >
        <i className="pi pi-filter-fill" style={{ color: 'white', fontSize: '16px' }} />
      </div>

      <div
        className="flex align-items-center justify-content-center"
        style={{
          width: '42px',
          height: '42px',
          backgroundColor: '#64748B',
          borderRadius: '6px',
          cursor: 'pointer'
        }}
      >
        <i className="pi pi-sliders-v" style={{ color: 'white', fontSize: '16px' }} />
      </div>
    </div>
  );
}
