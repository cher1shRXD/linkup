import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface TokenStore {
  accessToken: string | null;
  refreshToken: string | null;
  setAccessToken: (accessToken: string) => void;
  setRefreshToken: (refreshToken: string) => void;
  clearTokens: () => void;
}

const asyncStoragePersist = {
  getItem: async (key: string) => {
    const value = await AsyncStorage.getItem(key);
    if (value) {
      return JSON.parse(value);
    }
    return null;
  },
  setItem: async (key: string, value: any) => {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  },
  removeItem: async (key: string) => {
    await AsyncStorage.removeItem(key);
  },
};

const tokenStore = create(
  persist<TokenStore>(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      setAccessToken: (accessToken) => set({ accessToken }),
      setRefreshToken: (refreshToken) => set({ refreshToken }),
      clearTokens: () => set({ refreshToken: null, accessToken: null }),
    }),
    {
      name: "token-storage",
      storage: asyncStoragePersist,
    }
  )
);

export default tokenStore;