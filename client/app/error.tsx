'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="flex align-items-center justify-content-center min-h-screen flex-column gap-4">
      <h2>Algo salió mal!</h2>
      <button
        onClick={() => reset()}
        className="p-button p-component"
      >
        Intentar nuevamente
      </button>
    </div>
  );
}