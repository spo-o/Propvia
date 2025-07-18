import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const ADMIN_EMAIL = 'admin@propvia.com';

export interface User {
  id: string;
  email: string;
  full_name?: string;
  company?: string;
  phone?: string;
  role?: string;
  // any other fields from your backend payload
}
interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
}


export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isAdmin: false,

      setAuth: (user, token) => {
        set({
          user,
          token,
          isAuthenticated: true,
          isAdmin: user.email === ADMIN_EMAIL,
        });
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isAdmin: false,
        });
      },
    }),
    {
      name: 'auth-storage',
      // only persist user & token; isAuthenticated/isAdmin derive from them
      partialize: (state) => ({ user: state.user, token: state.token }),
    }
  )
);
