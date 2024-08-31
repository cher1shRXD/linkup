import { Keyboard, Pressable, Text } from 'react-native';
import { useTheme } from '../../../context/theme/themeContext';
import StackHeader from '../../stackHeader'
import * as S from './style'
import useLogin from '../../../hooks/auth/useLogin';

const Login = () => {

  const { theme } = useTheme();
  const { ...login } = useLogin();

  return (
    <S.Container>
      <StackHeader title="뒤로가기" target='AuthIntro'/>
      <Pressable style={{ flex: 1, width: "100%" }} onPress={Keyboard.dismiss}>
        <S.Title>로그인</S.Title>
        <S.InputWrap>
          <S.Input
            style={{
              borderBottomColor: theme.textColor,
              color: theme.textColor,
            }}
            placeholder="이메일을 입력하세요"
            value={login.email}
            onChangeText={login.handleEmail}
          />
          <S.Input
            style={{
              borderBottomColor: theme.textColor,
              color: theme.textColor,
            }}
            placeholder="비밀번호를 입력하세요"
            value={login.password}
            onChangeText={login.handlePassword}
            secureTextEntry
            textContentType="password"
          />
          <S.Filler></S.Filler>
          <S.Button activeOpacity={0.7} onPress={login.submit} disabled={login.loading}>
            <S.ButtonText>{login.loading ? "로그인 중..." : "로그인"}</S.ButtonText>
          </S.Button>
        </S.InputWrap>
      </Pressable>
    </S.Container>
  );
}

export default Login