import { useState } from "react";
import instance from "../../libs/axios/instance";

const useChangeNickname = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [nickname, setNickname] = useState<string>('');

  const handelNickname = (e:string) => {
    setNickname(e);
  }

  const submit = async () => {
    setLoading(true);
    const res = await instance.patch("/me", {
      nickname
    });
    if (res) {
      setNickname('');
      setLoading(false);
    }
    return res.data.data;
  };

  return {
    loading,
    nickname,
    handelNickname,
    submit,
  };
};

export default useChangeNickname;
