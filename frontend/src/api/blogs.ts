// src/api/blogs.ts
export const fetchBlogs = async (token: string) => {
  const res = await fetch('/api/blogs', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!res.ok) throw new Error('Failed to fetch blogs');
  return await res.json();
};


// src/api/blogs.ts
export const generateBlog = async (token: string, title: string) => {
  const res = await fetch('/api/blogs/generate', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title })
  });

  if (!res.ok) throw new Error('Failed to generate blog');
  return await res.json();
};

// src/api/blogs.ts
export const createBlog = async (
  token: string,
  blog: { title: string; content: string }
) => {
  const res = await fetch('/api/blogs', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(blog)
  });

  if (!res.ok) throw new Error('Failed to save blog post');
  return await res.json();
};

export const publishBlog = async (token: string, id: string) => {
  const res = await fetch(`/api/blogs/${id}/publish`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!res.ok) throw new Error('Failed to publish blog');
  return await res.json();
};

export const deleteBlog = async (token: string, id: string) => {
  const res = await fetch(`/api/blogs/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!res.ok) throw new Error('Failed to delete blog');
};

export const updateBlog = async (
  token: string,
  id: string,
  updates: { title?: string; content?: string }
) => {
  const res = await fetch(`/api/blogs/${id}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updates)
  });

  if (!res.ok) throw new Error('Failed to update blog');
  return await res.json();
};

