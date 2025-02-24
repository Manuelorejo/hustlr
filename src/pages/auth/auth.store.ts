import { create } from "zustand";
import { User } from "./auth.types";

interface AuthState {
  user: User | null;
  accessToken: string | null;
  setAuth: (data: { accessToken: string; firstName: string; lastName: string; email: string }) => void;
  removeAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,

  setAuth: (data) => {
    const { accessToken, firstName, lastName, email } = data;

    localStorage.setItem("accessToken", accessToken);

    set({
      user: { firstName, lastName, email },
      accessToken,
    });
  },

  removeAuth: () => {
    localStorage.removeItem("accessToken");
    set({ user: null, accessToken: null });
  },
}));
