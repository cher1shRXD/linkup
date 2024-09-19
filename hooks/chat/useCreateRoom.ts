import { NavigationProp, useNavigation } from "@react-navigation/native";
import instance from "../../libs/axios/instance"
import { Alert } from "react-native";

const useCreateRoom = () => {

  const navigation = useNavigation<NavigationProp<any>>();

  const createRoom = async (linkupId:string) => {
    try{
      const res = await instance.post('/chat-rooms/personal',{linkupId});
      if(res){
        console.log(linkupId);
        navigation.navigate("PersonalChatRoom", { linkupId });
      }
    }catch(err){
      console.log(err);
      Alert.alert('네트워크 에러');
    }
  }

  return{
    createRoom
  }
}

export default useCreateRoom