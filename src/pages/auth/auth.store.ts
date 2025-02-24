import { create } from "zustand";
import { User } from "./auth.types";

interface AuthState {
  user: User | null;
  accessToken: string | null;
  setAuth: (user: User, accessToken: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,

  setAuth: (user, accessToken) => {
    localStorage.setItem("accessToken", accessToken);
    set({ user, accessToken });
  },

  logout: () => {
    localStorage.removeItem("accessToken");
    set({ user: null, accessToken: null });
  },
}));
