import { useRef } from "react";
import { useTheme } from "../../context/theme/themeContext";
import useChangeStatusMessage from "../../hooks/user/useChangeStatusMessage";
import { User } from "../../types/auth/user.type";
import * as S from "./style";
import { TextInput } from "react-native";
import useGetMe from "../../hooks/user/useGetMe";

const EditStatusMessage = ({ user }: { user: User }) => {
  const { theme } = useTheme();
  const { ...statusMessage } = useChangeStatusMessage();
  const inputRef = useRef<TextInput | null>(null);
  const { ...me } = useGetMe();

  const changeStatusMessage = async () => {
    const res = await statusMessage.submit();
    if (res) {
      if (inputRef.current) {
        inputRef.current.blur();
      }
      me.getMe();
    }
  };

  return (
    <S.Container>
      <S.Input
        border={theme.borderColor}
        text={theme.textColor}
        maxLength={50}
        multiline
        numberOfLines={3}
        placeholder={user.statusMessage}
        value={statusMessage.statusMessage}
        onChangeText={statusMessage.handleStatusMessage}
        ref={inputRef}
      />
      <S.Button
        isDisabled={statusMessage.statusMessage.trim().length === 0}
        onPress={changeStatusMessage}
      >
        <S.ButtonText
          isDisabled={statusMessage.statusMessage.trim().length === 0}
        >
          {statusMessage.loading ? "변경 중..." : "변경"}
        </S.ButtonText>
      </S.Button>
    </S.Container>
  );
};

export default EditStatusMessage;
