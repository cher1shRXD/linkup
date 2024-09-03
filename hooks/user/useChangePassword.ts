import { useState } from "react";
import instance from "../../libs/axios/instance";

const useChangePassword = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [currentPassword, setCurrentPassword] = useState<string>("");

  const handlePassword = (e: string) => {
    setPassword(e);
  };

  const handleCurrentPassword = (e: string) => {
    setCurrentPassword(e);
  };

  const submit = async () => {
    setLoading(true);
    const res = await instance.patch("/me", {
      password,
      currentPassword
    });
    if (res) {
      setPassword("");
      setCurrentPassword("");
      setLoading(false);
    }
    return res.data.data;
  };

  return {
    loading,
    handleCurrentPassword,
    handlePassword,
    password,
    currentPassword,
    submit,
  };
};

export default useChangePassword;
