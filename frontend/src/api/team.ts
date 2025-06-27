export const inviteTeamMember = async (email: string, role: string) => {
  const res = await fetch('/api/team/invite', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, role }),
  });
  return res.json();
};

export const acceptInvitation = async (email: string) => {
  const res = await fetch('/api/team/accept', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  return res.json();
};

export const removeTeamMember = async (id: string) => {
  const res = await fetch(`/api/team/remove/${id}`, {
    method: 'DELETE',
  });
  return res.json();
};

export const updateTeamMemberRole = async (id: string, role: string) => {
  const res = await fetch(`/api/team/updateRole/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ role }),
  });
  return res.json();
};
