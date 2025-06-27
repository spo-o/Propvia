// src/api/subscribers.ts
export const fetchSubscribers = async (token: string) => {
  const res = await fetch('/api/subscribers', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!res.ok) throw new Error('Failed to fetch subscribers');
  return await res.json();
};