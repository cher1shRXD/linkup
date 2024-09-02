import { useState } from "react"
import { User } from "../../types/auth/user.type";
import instance from "../../libs/axios/instance";

const useGetFriends = () => {

  const [friends, setFriends] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getFriends = async () => {
    setLoading(true);
    const res = await instance.get('/friends');
    if(res){
      setFriends(res.data.data);
      setLoading(false);
    }
  }

  return {
    friends,
    getFriends,
    loading
  }
}

export default useGetFriends