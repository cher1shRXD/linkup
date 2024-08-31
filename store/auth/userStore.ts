import { create } from "zustand";
import { User } from "../../types/auth/user.type";


export interface UserStore {
  user: User;
  setUser: (user: User) => void;
  clearUser: () => void;
}

export const userStore = create<UserStore>((set) => ({
  user: {
    nickname: "",
    email: "",
    linkupId: "",
    phoneNumber: "",
    birthday: "",
    gender: "",
    statusMessage: "",
    profileImage: "",
  },
  setUser: (user) => set({ user }),
  clearUser: () =>
    set({
      user: {
        nickname: "",
        email: "",
        linkupId: "",
        phoneNumber: "",
        birthday: "",
        gender: "",
        statusMessage: "",
        profileImage: "",
      },
    }),
}));
