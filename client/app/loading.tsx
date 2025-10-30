import { Skeleton } from 'primereact/skeleton';

export default function Loading() {
  return (
    <div className="p-4">
      <div className="container mx-auto">
        <div className="flex justify-content-between align-items-center mb-3">
          <Skeleton width="150px" height="2rem" />
          <Skeleton width="160px" height="2.5rem" borderRadius="6px" />
        </div>

        <div className="card p-3">
          <div className="flex gap-2 mb-3">
            <div className="flex-1">
              <Skeleton height="2.5rem" borderRadius="6px" />
            </div>
            <div className="flex-1">
              <Skeleton height="2.5rem" borderRadius="6px" />
            </div>
            <Skeleton width="3rem" height="2.5rem" borderRadius="6px" />
            <Skeleton width="3rem" height="2.5rem" borderRadius="6px" />
          </div>

          <div className="mt-3">
            <div className="flex gap-3 mb-2 pb-2" style={{ borderBottom: '1px solid #dee2e6' }}>
              <Skeleton width="80px" height="1.5rem" />
              <Skeleton width="150px" height="1.5rem" />
              <Skeleton width="120px" height="1.5rem" />
              <Skeleton width="100px" height="1.5rem" />
              <Skeleton width="80px" height="1.5rem" />
            </div>

            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
              <div key={i} className="flex gap-3 py-2" style={{ borderBottom: '1px solid #f1f3f5' }}>
                <Skeleton width="80px" height="1.2rem" />
                <Skeleton width="150px" height="1.2rem" />
                <Skeleton width="120px" height="1.2rem" />
                <Skeleton width="100px" height="1.2rem" />
                <Skeleton width="80px" height="1.2rem" />
              </div>
            ))}

            <div className="flex justify-content-between align-items-center mt-3 pt-2">
              <Skeleton width="150px" height="2rem" />
              <Skeleton width="200px" height="2rem" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}