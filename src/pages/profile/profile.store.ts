import { create } from "zustand";
import {User} from "./profile.types"

interface ProfileState{
    user : User|null;
    setProfile: (user: User) => void;
    removeProfile : () => void;
}

export const useProfileStore = create<ProfileState>((set) => ({
    user: null,

    setProfile: (user) => {
        set({ user: user });
    },
    removeProfile : () =>{
        set({
            user : null
        })
    }

}))