import { Alert } from "react-native";
import instance from "../../libs/axios/instance"

const useAcceptReq = () => {
  const acceptReq = async (linkupId:string) => {
    try{
      const res = await instance.post(`/friend-requests/${linkupId}/accept`);
      if(res){
        return res.data.data;
      }
    }catch{
      Alert.alert('수락 실패','친구 요청 수락에 실패했습니다.');
      return;
    }
  }
  return{
    acceptReq
  }
}

export default useAcceptReq