import { useState } from "react"
import instance from "../../libs/axios/instance";

const useChangeImg = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const changeImg = async (url:string) => {
    setLoading(true);
    const res = await instance.patch("/users/me", {
      profileImage: "https://eb1f-175-202-245-36.ngrok-free.app/uploads/" + url,
    });
    if(res){
      setLoading(false);
    }
    return res.data.data;
  }

  return {
    loading,
    changeImg
  }
}

export default useChangeImg