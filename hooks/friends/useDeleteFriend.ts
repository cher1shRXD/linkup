import { Alert } from "react-native"
import instance from "../../libs/axios/instance";

const useDeleteFriend = () => {
  const submit = async (linkupId:string) => {
    Alert.alert(
      "삭제",
      "정말로 삭제하시겠습니까?",
      [
        { text: "취소", onPress: () => {}, style: "cancel" },
        {
          text: "삭제",
          onPress: () => {
            deleteReq(linkupId);
          },
          style: "destructive",
        },
      ],
      {
        cancelable: true,
        onDismiss: () => {},
      }
    );
  }

  const deleteReq = async (linkupId:string) => {
    try{
      const res = await instance.delete(`/friends/${linkupId}`);
      if(res){
        Alert.alert('삭제 성공','친구가 성공적으로 삭제되었습니다');
      }
    }catch{
      Alert.alert('삭제 실패','친구 삭제에 실패했습니다');
    }
  }

  return {
    submit
  }
}

export default useDeleteFriend