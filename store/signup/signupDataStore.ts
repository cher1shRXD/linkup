import { create } from "zustand";
import { SignupData } from "../../types/auth/auth.type";

export interface SignupDataStore {
  signupData: SignupData;
  setSignupData: (update: Partial<SignupData>) => void;
  clearSignupData: () => void;
}

export const signupDataStore = create<SignupDataStore>((set) => ({
  signupData: {
    email: "",
    password: "",
    nickname: "",
    realName: "",
    phoneNumber: "",
    gender: "",
    birthday: null,
  },
  setSignupData: (update: Partial<SignupData>) =>
    set((state) => ({
      signupData: { ...state.signupData, ...update },
    })),
  clearSignupData: () =>
    set({
      signupData: {
        email: "",
        password: "",
        nickname: "",
        realName: "",
        phoneNumber: "",
        gender: "",
        birthday: null,
      },
    }),
}));
