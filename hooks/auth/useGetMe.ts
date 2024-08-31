import { useState } from "react";
import instance from "../../libs/axios/instance"
import { Alert } from "react-native";
import { userStore } from "../../store/auth/userStore";

const useGetMe = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const setUser = userStore(state=>state.setUser);
  const getMe = async () => {
    setLoading(true);
    const res = await instance.get("/users/me");
    if (res) {
      setUser(res.data.data);
      setLoading(false);
    }
  }
  return{
    loading,
    getMe
  }
}

export default useGetMe