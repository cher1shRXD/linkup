import { useState } from "react"
import { ChatList } from "../../types/chat/chatList.type";
import { Alert } from "react-native";
import instance from "../../libs/axios/instance";

const useGetChatList = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [chatList, setChatList] = useState<ChatList[]>([]);
  const getChatList = async () => {
    setLoading(true);
    try{
      const res = await instance.get('/chat-rooms/personal');
      if(res){
        setChatList(res.data.data);
      }
    }catch{
      Alert.alert('네트워크 에러');
    }
    setTimeout(()=>{
      setLoading(false);
    },1000);
  }

  return {
    loading,
    chatList,
    getChatList
  }
}

export default useGetChatList