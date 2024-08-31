import { create } from "zustand";
import { SignupData } from "../../types/auth/signup.type";

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
    linkupId: "",
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
        linkupId: "",
        phoneNumber: "",
        gender: "",
        birthday: null,
      },
    }),
}));
