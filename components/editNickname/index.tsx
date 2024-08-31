import * as S from "./style";
import { User } from "../../types/auth/user.type";
import { useTheme } from "../../context/theme/themeContext";
import { Alert, TextInput } from "react-native";
import useChangeNickname from "../../hooks/user/useChangeNickname";
import useGetMe from "../../hooks/user/useGetMe";
import { useRef } from "react";

const EditNickname = ({ user }: { user: User }) => {
  const { theme } = useTheme();
  const { ...me } = useGetMe();
  const { ...nickname } = useChangeNickname();
  const inputRef = useRef<TextInput | null>(null);

  const changeNickname = async () => {
    try{
      const res = await nickname.submit();
      if(res){
        if(inputRef.current){
          inputRef.current.blur();
        }
        me.getMe();
      }
    }catch{
      Alert.alert("네트워크 에러","나중에 다시 시도해주세요")
    }
  }

  return (
    <S.Container>
      <S.Input
        color={theme.textColor}
        placeholder={user.nickname}
        value={nickname.nickname}
        onChangeText={nickname.handelNickname}
        ref={inputRef}
      />
      <S.Button
        isDisabled={nickname.nickname.trim().length === 0}
        disabled={nickname.nickname.trim().length === 0}
        onPress={changeNickname}
      >
        <S.ButtonText
          isDisabled={nickname.nickname.trim().length === 0 || nickname.loading}
        >
          변경
        </S.ButtonText>
      </S.Button>
    </S.Container>
  );
};

export default EditNickname;
