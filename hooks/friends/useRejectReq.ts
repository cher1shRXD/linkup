import { Alert } from "react-native";
import instance from "../../libs/axios/instance";

const useRejectReq = () => {
  const rejectReq = async (linkupId: string) => {
    try {
      const res = await instance.post(`/friend-requests/${linkupId}/reject`);
      if (res) {
        return res.data.data;
      }
    } catch {
      Alert.alert("거절 실패", "친구 요청 거절에 실패했습니다.");
      return;
    }
  };
  return {
    rejectReq,
  };
};

export default useRejectReq;
