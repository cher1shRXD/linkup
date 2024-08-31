import { create } from "zustand";
import { User } from "../../types/auth/user.type";


export interface UserStore {
  user: User;
  setUser: (user: User) => void;
  clearUser: () => void;
}

export const userStore = create<UserStore>((set) => ({
  user: {
    id: 0,
    nickname: "",
    email: "",
    name: "",
    phone: "",
    birthday: "",
    gender: "",
  },
  setUser: (user) => set({ user }),
  clearUser: () =>
    set({
      user: {
        id: 0,
        nickname: "",
        email: "",
        name: "",
        phone: "",
        birthday: "",
        gender: "",
      },
    }),
}));
