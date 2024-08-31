import { NavigationProp, useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useState } from "react";
import { Alert } from "react-native";
import { signupDataStore } from "../../store/signup/signupDataStore";

const useSignup = () => {
  const signupData = signupDataStore(state=>state.signupData);
  const setSignupData = signupDataStore(state=>state.setSignupData);
  const [loading, setLoading] = useState<boolean>(false);

  const navigation = useNavigation<NavigationProp<any>>();

  const handleSignupData = (e: string, fieldName:string) => {
    setSignupData({ [fieldName]: e });
  };

  const submit = async () => {
    setLoading(true);
    try {
      const res = await axios.post("https://somewheretologin.com/auth/login", signupData);
      if (res) {
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
