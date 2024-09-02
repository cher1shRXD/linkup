import { useState } from "react"
import { User } from "../../types/auth/user.type";
import instance from "../../libs/axios/instance";

const useGetFriendDetail = () => {
  const [friendDetail, setFriendDetail] = useState<User>({
    nickname:'',
    birthday:'',
    email:'',
    gender:'MALE',
    linkupId:'',
    phoneNumber:'',
    profileImage:'',
    statusMessage:''
  });
  const [loading, setLoading] = useState<boolean>(false);
  const getFriendDetail = async (linkupId:string) => {
    setLoading(true);
    const res = await instance.get(`/friends/${linkupId}`);
    if(res){
      setFriendDetail(res.data.data);
      setLoading(false);
    }
  }
  return {
    friendDetail,
    loading,
    getFriendDetail
  }
}

export default useGetFriendDetail