// src/api/users.ts
export const fetchUsers = async (token: string) => {
  const res = await fetch('/api/users', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!res.ok) throw new Error('Failed to fetch users');
  return await res.json();
};
