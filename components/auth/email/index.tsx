import { Alert, Keyboard, Pressable } from 'react-native';
import { useTheme } from '../../../context/theme/themeContext';
import StackHeader from '../../stackHeader'
import * as S from './style'
import useSignup from '../../../hooks/auth/useSignup';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import axios from 'axios';

const Email = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const { theme } = useTheme();
  const { ...signup } = useSignup();

  const navigation = useNavigation<NavigationProp<any>>();

  const submit = async () => {
    setLoading(true);
    const REGEX =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    if (signup.signupData.email.trim() === "") {
      Alert.alert("공백 방지", "공백을 제외한 1글자 이상 입력해주세요");
      setLoading(false);
      return;
    }
    if(!REGEX.test(signup.signupData.email)) {
      Alert.alert("유효하지 않은 이메일", "올바른 이메일 형식으로 입력해주세요");
      setLoading(false);
      return;
    }
    try{
      const res = await axios.get(
        "https://119b-175-202-245-36.ngrok-free.app/auth/email",
        { params: { email: signup.signupData.email } }
      );
      if(res && !res.data.data){
        navigation.navigate("PasswordScreen");
      }else{
        Alert.alert("이미 사용중인 이메일", "해당 이메일이 이미 사용중입니다");
      }
    }catch{
      Alert.alert('네트워크 에러');
    }
    setLoading(false);
  }

  return (
    <S.Container>
      <StackHeader title="뒤로가기" />
      <Pressable style={{ flex: 1, width: "100%" }} onPress={Keyboard.dismiss}>
        <S.Title>사용하실 이메일을 입력해주세요</S.Title>
        <S.Subtitle>이메일은 로그인시 이용 됩니다.</S.Subtitle>
        <S.InputWrap>
          <S.Input
            style={{
              borderBottomColor: theme.textColor,
              color: theme.textColor,
            }}
            placeholder="이메일을 입력해주세요"
            value={signup.signupData.email}
            onChangeText={(e)=>{signup.handleSignupData(e,'email')}}
          />
          <S.Filler></S.Filler>
          <S.Button activeOpacity={0.7} onPress={submit} disabled={loading}>
            <S.ButtonText>{loading ? "확인 중..." : "다음"}</S.ButtonText>
          </S.Button>
        </S.InputWrap>
      </Pressable>
    </S.Container>
  );
}

export default Email