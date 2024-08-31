import * as S from "./style";
import { User } from "../../types/auth/user.type";
import { useTheme } from "../../context/theme/themeContext";
import { Alert, TextInput } from "react-native";
import useGetMe from "../../hooks/user/useGetMe";
import { useEffect, useRef, useState } from "react";
import useChangeLinkupId from "../../hooks/user/useChangeLinkupId";
import instance from "../../libs/axios/instance";

const EditLinkupId = ({ user }: { user: User }) => {
  const [canChange, setCanChange] = useState<boolean>(false);
  const { theme } = useTheme();
  const { ...me } = useGetMe();
  const { ...linkupId } = useChangeLinkupId();
  const inputRef = useRef<TextInput | null>(null);

  const checkCanChange = async () => {
    const res = await instance.get("/users/me/linkup-id");
    if (res) {
      setCanChange(res.data.data);
    }
  };

  useEffect(() => {
    checkCanChange();
  }, []);

  const changeLinkupId = async () => {
    try {
      const res = await linkupId.submit();
      if (res) {
        if (inputRef.current) {
          inputRef.current.blur();
        }
        me.getMe();
      }
    } catch {
      Alert.alert("네트워크 에러", "나중에 다시 시도해주세요");
    }
  };

  return (
    <S.Container>
      <S.Input
        color={theme.textColor}
        placeholder={user.linkupId}
        value={linkupId.linkupId}
        onChangeText={linkupId.handleLinkupId}
        ref={inputRef}
      />
      <S.Button
        isDisabled={linkupId.linkupId.trim().length === 0 || !canChange}
        disabled={linkupId.linkupId.trim().length === 0 || !canChange}
        onPress={changeLinkupId}
      >
        <S.ButtonText
          isDisabled={
            linkupId.linkupId.trim().length === 0 ||
            linkupId.loading ||
            !canChange
          }
        >
          변경
        </S.ButtonText>
      </S.Button>
    </S.Container>
  );
};

export default EditLinkupId;
