import { useState } from "react";
import instance from "../../libs/axios/instance";

const useDeleteImg = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const deleteImg = async () => {
    setLoading(true);
    const res = await instance.patch("/me", {
      profileImage:
        "https://cdn2.ppomppu.co.kr/zboard/data3/2022/0509/m_20220509173224_d9N4ZGtBVR.jpeg",
    });
    if (res) {
      setLoading(false);
    }
    return res.data.data;
  };

  return {
    loading,
    deleteImg,
  };
};

export default useDeleteImg;
