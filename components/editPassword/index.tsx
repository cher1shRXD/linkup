import * as S from './style'
import useGetMe from '../../hooks/user/useGetMe';
import { useTheme } from '../../context/theme/themeContext';
import { useRef } from 'react';
import { Alert, TextInput } from 'react-native';
import useChangePassword from '../../hooks/user/useChangePassword';

const EditPassword = () => {
  const { theme } = useTheme();
  const { ...me } = useGetMe();
  const { ...password } = useChangePassword();
  const inputRef = useRef<TextInput | null>(null);

  const changePassword = async () => {
    try {
      const res = await password.submit();
      if (res) {
        if (inputRef.current) {
          inputRef.current.blur();
        }
        me.getMe();
      }
    } catch {
      Alert.alert("비밀번호 틀림", "현재 비밀번호가 올바르지 않습니다.");
    }
  };

  return (
    <S.Container>
      <S.InputWrap>
        <S.Input
          color={theme.textColor}
          placeholder="새로운 비밀번호"
          value={password.password}
          onChangeText={password.handlePassword}
          ref={inputRef}
          secureTextEntry
          textContentType="password"
        />
        <S.Button
          isDisabled={password.password.trim().length === 0}
          disabled={password.password.trim().length === 0}
          onPress={changePassword}
        >
          <S.ButtonText
            isDisabled={
              password.password.trim().length === 0 || password.loading
            }
          >
            변경
          </S.ButtonText>
        </S.Button>
      </S.InputWrap>
      {password.password.trim().length > 0 && (
        <S.InputWrap>
          <S.Input
            color={theme.textColor}
            placeholder="현재 비밀번호"
            value={password.currentPassword}
            onChangeText={password.handleCurrentPassword}
            ref={inputRef}
            secureTextEntry
            textContentType="password"
          />
        </S.InputWrap>
      )}
    </S.Container>
  );
}

export default EditPassword