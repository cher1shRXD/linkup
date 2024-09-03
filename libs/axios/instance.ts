import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import tokenStore from "../../store/auth/tokenStore";
import { Alert } from "react-native";
import { userStore } from "../../store/auth/userStore";

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const instance = axios.create({
  baseURL: "https://3d74-221-168-22-204.ngrok-free.app",
  headers: {
    Accept: "*/*",
  },
  withCredentials: true,
});

instance.interceptors.request.use(
  async (config) => {
    const { accessToken } = tokenStore.getState();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    } else {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    const { refreshToken, setAccessToken, setRefreshToken, clearTokens } =
      tokenStore.getState();
    const { clearUser } = userStore.getState();
    const originalRequest = error.config as CustomAxiosRequestConfig;

    if (originalRequest.data instanceof FormData) {
      originalRequest.headers["Content-Type"] = "multipart/form-data";
    } else {
      originalRequest.headers["Content-Type"] = "application/json";
    }
    if (originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;
      if (refreshToken) {
        axios
          .post(`https://3d74-221-168-22-204.ngrok-free.app/auth/reissue`, {
            refreshToken,
          })
          .then((response) => {
            const newAccessToken = response.data.data.accessToken;
            const newRefreshToken = response.data.data.refreshToken;

            setAccessToken(newAccessToken);
            setRefreshToken(newRefreshToken);

            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return instance(originalRequest);
          })
          .catch((refreshError) => {
            clearTokens();
            clearUser();
            return Promise.reject(refreshError);
          });
      }
    }
  }
);

export default instance;
