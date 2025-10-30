import { Suspense } from 'react';
import { UsersPageTemplate } from './components/templates';
import { Skeleton } from 'primereact/skeleton';
import { env } from './lib/env';

const API_BASE_URL = env.API_BASE_URL;
const API_SECTOR = env.API_SECTOR;

async function getInitialUsers() {
  const params = new URLSearchParams();
  params.append("sector", API_SECTOR);
  params.append("_page", "1");
  params.append("_limit", "10");
  params.append("_sort", "id");
  params.append("_order", "asc");

  const res = await fetch(`${API_BASE_URL}?${params.toString()}`, {
    next: { revalidate: 60 } // Cachear 60 segundos para mejorar performance
  });

  if (!res.ok) {
    throw new Error('Failed to fetch users');
  }

  const data = await res.json();
  const total = parseInt(res.headers.get('X-Total-Count') || '0', 10);

  const users = Array.isArray(data) ? data : [];

  return { users, total };
}

export const revalidate = 60;

async function UsersData() {
  const { users, total } = await getInitialUsers();
  return <UsersPageTemplate initialUsers={users} initialTotal={total} />;
}

function UsersLoadingFallback() {
  return (
    <div className="p-4">
      <div className="container mx-auto">
        <div className="flex justify-content-between align-items-center mb-3">
          <Skeleton width="150px" height="2rem" />
          <Skeleton width="160px" height="2.5rem" />
        </div>
        <div className="card p-3">
          <div className="flex gap-2 mb-3">
            <Skeleton className="flex-1" height="2.5rem" />
            <Skeleton className="flex-1" height="2.5rem" />
          </div>
          {[...Array(10)].map((_, i) => (
            <Skeleton key={i} height="3rem" className="mb-2" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function UsersPage() {
  return (
    <div className="p-4">
      <div className="container mx-auto">
        <Suspense fallback={<UsersLoadingFallback />}>
          <UsersData />
        </Suspense>
      </div>
    </div>
  );
}