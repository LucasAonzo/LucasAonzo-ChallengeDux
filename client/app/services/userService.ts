import { User } from '../types/users';
import { logger } from '../lib/logger';
import { env } from '../lib/env';

const API_BASE_URL = env.API_BASE_URL;
const API_SECTOR = env.API_SECTOR;

export const userService = {
  async getUsers(params: {
    page: number;
    limit: number;
    sortField?: string;
    sortOrder?: number | null;
    query?: string;
    estado?: string | null;
  }) {
    const searchParams = new URLSearchParams({
      sector: API_SECTOR,
      _page: params.page.toString(),
      _limit: params.limit.toString(),
    });

    if (params.sortField) {
      searchParams.append('_sort', params.sortField);
      searchParams.append('_order', params.sortOrder === 1 ? 'asc' : 'desc');
    }

    if (params.query) {
      searchParams.append('q', params.query);
    }

    if (params.estado) {
      searchParams.append('estado', params.estado);
    }

    const res = await fetch(`${API_BASE_URL}?${searchParams.toString()}`);
    if (!res.ok) {
      throw new Error('Failed to fetch users');
    }

    const data = await res.json();
    const users = Array.isArray(data) ? data : [];
    const total = parseInt(res.headers.get('X-Total-Count') || '0', 10);

    return { users, total };
  },

  async createUser(user: User) {
    const res = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: user.id,
        usuario: user.usuario,
        estado: user.estado,
        sector: parseInt(API_SECTOR, 10)
      })
    });

    if (!res.ok) {
      const errorText = await res.text();
      logger.error('Create user failed', {
        status: res.status,
        statusText: res.statusText,
        body: errorText
      });
      throw new Error(`Failed to create user: ${res.status} ${res.statusText} - ${errorText}`);
    }

    const data = await res.json();
    return Array.isArray(data) ? data[0] : data;
  },

  async updateUser(user: User) {
    const res = await fetch(`${API_BASE_URL}/${user.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...user,
        sector: parseInt(API_SECTOR, 10)
      })
    });

    if (!res.ok) {
      const errorText = await res.text();
      logger.error('Update user failed', {
        status: res.status,
        statusText: res.statusText,
        body: errorText
      });
      throw new Error(`Failed to update user: ${res.status} ${res.statusText} - ${errorText}`);
    }

    const data = await res.json();
    return Array.isArray(data) ? data[0] : data;
  },

  async deleteUser(id: string) {
    const res = await fetch(`${API_BASE_URL}/${id}?sector=${API_SECTOR}`, {
      method: 'DELETE'
    });

    if (!res.ok) {
      const errorText = await res.text();
      logger.error('Delete user failed', {
        status: res.status,
        statusText: res.statusText,
        body: errorText
      });
      throw new Error(`Failed to delete user: ${res.status} ${res.statusText} - ${errorText}`);
    }
  }
};