import { create } from "zustand";
import { User } from "./auth.types";

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated:  boolean | null;
  setAuth: (data: { accessToken: string; firstName: string; lastName: string; email: string }) => void;
  setUserProfile: (profile: User) => void;
  removeAuth: () => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: localStorage.getItem("accessToken") || null,
  isAuthenticated: localStorage.getItem("accessToken") === "true",

  setAuth: (data) => {
    const { accessToken, firstName, lastName, email } = data;
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("isAuthenticated", "true");
    set({
      user: { firstName, lastName, email },
      accessToken,
      isAuthenticated: Boolean(localStorage.getItem("accessToken"))
    });
  },

  setUserProfile: (profile) => {
    set({ user: profile });
  },

  setIsAuthenticated: (isAuthenticated) => {
    set({ isAuthenticated });
  },

  removeAuth: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("isAuthenticated");
    set({ user: null, accessToken: null, isAuthenticated: false });
  },
}));
