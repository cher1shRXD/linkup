import { useState } from "react"
import instance from "../../libs/axios/instance";
import { Alert } from "react-native";

const useAddReq = () => {
  const [loading,setLoading] = useState<boolean>(false);
  const [requestTmp, setRequestTmp] = useState<boolean>(false);

  const addReq = async (linkupId:string) => {
    setLoading(true);
    try{
      const res = await instance.post(`/friend-requests`,{},{params:{linkupId}});
      Alert.alert('친구요청 성공', '친구 요청이 성공적으로 전송되었습니다.')
      setLoading(false);
      setRequestTmp(true);
      return res.data.data;
    }catch{
      Alert.alert('친구요청 실패', '나중에 다시 시도해주세요.');
    }
    setLoading(false);
  }
  return {
    loading,
    addReq,
    requestTmp
  }
}

export default useAddReq