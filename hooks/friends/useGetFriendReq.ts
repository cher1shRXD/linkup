import { useState } from "react"
import { User } from "../../types/auth/user.type";
import instance from "../../libs/axios/instance";

const useGetFriendReq = () => {
  const [requests, setRequests] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const getFriendReq = async () => {
    setLoading(true);
    const res = await instance.get('/friend-requests');
    if(res){
      setRequests(res.data.data);
    }
    setLoading(false);
  }  

  return {
    requests,
    loading,
    getFriendReq
  }
}

export default useGetFriendReq