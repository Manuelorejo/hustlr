import { create } from "zustand";

interface AuthState {
  accessToken: string | null;
  isAuthenticated:  boolean | null;
  setAuth: (accessToken: string) => void;
  removeAuth: () => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: localStorage.getItem("accessToken") || null,
  isAuthenticated: localStorage.getItem("accessToken") === "true",

  setAuth: (accessToken) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("isAuthenticated", "true");
    set({
      accessToken,
      isAuthenticated: Boolean(localStorage.getItem("accessToken"))
    });
  },

  setIsAuthenticated: (isAuthenticated) => {
    set({ isAuthenticated });
  },

  removeAuth: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("isAuthenticated");
    set({ accessToken: null, isAuthenticated: false });
  },
}));
