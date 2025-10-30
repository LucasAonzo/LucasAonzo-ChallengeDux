const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const API_SECTOR = process.env.NEXT_PUBLIC_API_SECTOR;

// Validamos que las env vars existan en desarrollo
if (process.env.NODE_ENV === 'development') {
  if (!API_BASE_URL) {
    throw new Error(
      'NEXT_PUBLIC_API_URL no está definida. ' +
      'Crear .env.local siguiendo el template de .env.example'
    );
  }
  if (!API_SECTOR) {
    throw new Error(
      'NEXT_PUBLIC_API_SECTOR no está definida. ' +
      'Crear .env.local siguiendo el template de .env.example'
    );
  }
}

export const env = {
  API_BASE_URL: API_BASE_URL!,
  API_SECTOR: API_SECTOR!,
} as const;
