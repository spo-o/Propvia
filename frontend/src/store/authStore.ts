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
        localStorage.setItem('user_id', user.id); // ✅ Save to localStorage
      
        set({
          user,
          token,
          isAuthenticated: true,
          isAdmin: user.email === ADMIN_EMAIL,
        });
      },
      

      logout: () => {
        localStorage.removeItem('user_id'); // ✅ Clear on logout
      
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
      // 👇 hydrate *derived booleans* when loading from storage
      onRehydrateStorage: () => (state, error) => {
        if (state?.user) {
          state.isAuthenticated = true;
          state.isAdmin = state.user.email === ADMIN_EMAIL;
        }
      },
    }
  )
);