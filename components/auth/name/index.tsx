import { Alert, Keyboard, Pressable } from 'react-native';
import { useTheme } from '../../../context/theme/themeContext';
import StackHeader from '../../stackHeader'
import * as S from './style'
import useSignup from '../../../hooks/auth/useSignup';
import { NavigationProp, useNavigation } from '@react-navigation/native';

const Name = () => {

  const { theme } = useTheme();
  const { ...signup } = useSignup();
  const navigation = useNavigation<NavigationProp<any>>();

  const submit = () => {
    if(signup.signupData.name.trim() === '') {
      Alert.alert('공백 방지','공백을 제외한 1글자 이상 입력해주세요')
      return;
    }
    navigation.navigate("PhoneScreen");
  }

  return (
    <S.Container>
      <StackHeader title="뒤로가기" />
      <Pressable style={{ flex: 1, width: "100%" }} onPress={Keyboard.dismiss}>
        <S.Title>이름을 알려주세요</S.Title>
        <S.Subtitle>이름은 친구추가시 이용 됩니다.</S.Subtitle>
        <S.InputWrap>
          <S.Input
            style={{
              borderBottomColor: theme.textColor,
              color: theme.textColor,
            }}
            placeholder="이름을 입력해주세요"
            value={signup.signupData.name}
            onChangeText={(e) => {
              signup.handleSignupData(e, "name");
            }}
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

export default Name