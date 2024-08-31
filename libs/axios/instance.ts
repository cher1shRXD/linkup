import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import tokenStore from "../../store/auth/tokenStore";
import { Alert } from "react-native";

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const instance = axios.create({
  baseURL: "https://119b-175-202-245-36.ngrok-free.app/",
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
          .post(`https://119b-175-202-245-36.ngrok-free.app/auth/reissue`, {
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
            Alert.alert('토큰 만료', '서비스 이용을 위해 다시 로그인 해주세요')
            return Promise.reject(refreshError);
          });
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
