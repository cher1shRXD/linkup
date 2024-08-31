import axios from "axios";
import { useState } from "react";
import tokenStore from "../../store/auth/tokenStore";
import { Alert } from "react-native";

const useLogin = () => {
  const [email,setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading,setLoading] = useState<boolean>(false);

  const setAccessToken = tokenStore(state=>state.setAccessToken);
  const setRefreshToken = tokenStore((state) => state.setRefreshToken);

  const handleEmail = (e:string) => {
    setEmail(e);
  }
  const handlePassword = (e:string) => {
    setPassword(e);
  }

  const submit = async () => {
    setLoading(true);
    try{
      const res = await axios.post('https://somewheretologin.com/auth/login',{email,password});
      if(res){
        setAccessToken(res.data.accessToken);
        setRefreshToken(res.data.refreshToken);
      }
    }catch{
      Alert.alert('로그인 실패','이메일 또는 비밀번호를 확인해주세요');
    }
    setLoading(false);
  }

  return{
    email,
    password,
    handleEmail,
    handlePassword,
    submit,
    loading
  }
}

export default useLogin