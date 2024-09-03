import { NavigationProp, useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useState } from "react";
import { Alert } from "react-native";
import { signupDataStore } from "../../store/signup/signupDataStore";

const useSignup = () => {
  const signupData = signupDataStore(state=>state.signupData);
  const setSignupData = signupDataStore(state=>state.setSignupData);
  const clearSignupData = signupDataStore(state=>state.clearSignupData);
  const [loading, setLoading] = useState<boolean>(false);

  const navigation = useNavigation<NavigationProp<any>>();

  const handleSignupData = (e: string | Date, fieldName:string) => {
    setSignupData({ [fieldName]: e });
  };

  const formatDate = (date:Date|null) => {
    if(date){
      let year = date.getFullYear();
      let month = (date.getMonth() + 1).toString().padStart(2, "0");
      let day = date.getDate().toString().padStart(2, "0");

      return `${year}-${month}-${day}`;
    }
  }

  const submit = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        "https://3d74-221-168-22-204.ngrok-free.app/auth/signup",
        {
          ...signupData,
          phoneNumber: "+8210" + signupData.phoneNumber.split("010")[1],
          birthday: formatDate(signupData.birthday),
        }
      );
      if (res) {
        clearSignupData();
        Alert.alert('회원가입 성공', '서비스 이용을 위해 로그인 해주세요')
        navigation.navigate('LoginScreen');
      }
    } catch {
      Alert.alert("회원가입 실패", "나중에 다시 시도해주세요");
    }
    setLoading(false);
  };

  return {
    signupData,
    handleSignupData,
    submit,
    loading,
  };
};

export default useSignup;
