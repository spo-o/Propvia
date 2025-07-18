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
}

export interface AuthState {
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
      partialize: (state) => ({ user: state.user, token: state.token }),
      onRehydrateStorage: (state) => (storedState) => {
        if (storedState?.user) {
          //  Properly set booleans on load
          state.set({
            isAuthenticated: true,
            isAdmin: storedState.user.email === ADMIN_EMAIL,
          });
        } else {
          state.set({
            isAuthenticated: false,
            isAdmin: false,
          });
        }
      },
    }
  )
);
