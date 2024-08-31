import { useState } from "react"
import instance from "../../libs/axios/instance";

const useChangeImg = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const changeImg = async (url:string) => {
    setLoading(true);
    const res = await instance.patch('/users/me',{profileImage:url});
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