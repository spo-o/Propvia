export interface User {
  id: string;
  email: string;
  user_metadata: {
    full_name: string;
    phone: string;
    company: string;
    role: string;
  };
}

export interface UserResponse {
  user: User;
}

export interface Session {
  access_token: string;
  refresh_token: string;
  expires_at: number;
  token_type: string;
}

export interface AuthResponse {
  user: User;
  session: Session;
}

export async function signup(
  email: string,
  password: string,
  profile: Record<string, any>
): Promise<UserResponse> {
  const payload = {
    email,
    password,
    profile: {
      firstName: profile.firstName,
      lastName: profile.lastName,
      phone: profile.phone,
      company: profile.company,
      role: profile.role,
    },
  };

  const res = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  console.log('signup payload →', JSON.stringify(payload, null, 2));

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Signup failed');
  }

  return res.json();
}

export async function login(
  email: string,
  password: string
): Promise<AuthResponse> {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Login failed');
  }

  return res.json();
}

export async function sendPasswordReset(
  email: string,
): Promise<AuthResponse> {
  const res = await fetch('/api/auth/passwordReset', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email}),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Email not found');
  }

  return res.json();
}

export const getAdminRole = async (token: string) => {
  const res = await fetch('/api/user/role', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!res.ok) throw new Error('Failed to fetch role');
  return await res.json();
};


