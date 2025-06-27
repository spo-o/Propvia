// src/api/newsletters.ts
export const fetchNewsletters = async (token: string) => {
  const res = await fetch('/api/newsletters', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!res.ok) throw new Error('Failed to fetch newsletters');
  return await res.json();
};