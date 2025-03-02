import { create } from "zustand";

interface AuthState {
  accessToken: string | null;
  setAuth: (accessToken: string) => void;
  removeAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: localStorage.getItem("accessToken") || null,

  setAuth: (accessToken) => {
    localStorage.setItem("accessToken", accessToken);
    set({accessToken});
  },

  removeAuth: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("isAuthenticated");
    set({ accessToken: null });
  },
}));
