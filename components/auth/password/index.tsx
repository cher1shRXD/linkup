import { Alert, Keyboard, Pressable } from 'react-native';
import { useTheme } from '../../../context/theme/themeContext';
import StackHeader from '../../stackHeader'
import * as S from './style'
import useSignup from '../../../hooks/auth/useSignup';
import { useState } from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';

const Password = () => {

  const { theme } = useTheme();
  const { ...signup } = useSignup();
  const navigation = useNavigation<NavigationProp<any>>();

  const [retype, setRetype] = useState<string>('');

  const handleRetype = (e:string) => {
    setRetype(e);
  }

  const submit = () => {
    if(signup.signupData.password.trim() === '' || retype.trim() === '') {
      Alert.alert("공백 방지", "공백을 제외한 1글자 이상 입력해주세요");
      return;
    }
    if(retype !== signup.signupData.password) {
      Alert.alert('비밀번호 틀림','비밀번호가 틀립니다')
      return;
    }
    navigation.navigate('NameScreen');
  }

  return (
    <S.Container>
      <StackHeader title="뒤로가기" />
      <Pressable style={{ flex: 1, width: "100%" }} onPress={Keyboard.dismiss}>
        <S.Title>비밀번호를 입력해주세요.</S.Title>
        <S.InputWrap>
          <S.Input
            style={{
              borderBottomColor: theme.textColor,
              color: theme.textColor,
            }}
            placeholder="비밀번호를 입력해주세요"
            value={signup.signupData.password}
            onChangeText={(e) => {
              signup.handleSignupData(e, "password");
            }}
            secureTextEntry
            textContentType="password"
          />
          <S.Input
            style={{
              borderBottomColor: theme.textColor,
              color: theme.textColor,
            }}
            placeholder="비밀번호 확인"
            secureTextEntry
            textContentType="password"
            onChangeText={handleRetype}
            value={retype}
          />
          <S.Filler></S.Filler>
          <S.Button activeOpacity={0.7} onPress={submit}>
            <S.ButtonText>다음</S.ButtonText>
          </S.Button>
        </S.InputWrap>
      </Pressable>
    </S.Container>
  );
}

export default Password