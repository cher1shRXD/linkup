import { Keyboard, Pressable, RefreshControl, ScrollView } from "react-native";
import StackHeader from "../../stackHeader";
import * as S from "./style";
import useGetMe from "../../../hooks/user/useGetMe";
import tokenStore from "../../../store/auth/tokenStore";
import { userStore } from "../../../store/auth/userStore";
import { useEffect, useState } from "react";
import EditProfileImg from "../../editProfileImg";
import { useTheme } from "../../../context/theme/themeContext";
import EditNickname from "../../editNickname";
import EditLinkupId from "../../editLinkupId";
import EditStatusMessage from "../../editStatusMessage";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import EditPassword from "../../editPassword";

const EditProfile = () => {
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const { ...me } = useGetMe();
  const ACCESS_TOKEN = tokenStore((state) => state.accessToken);
  const user = userStore((state) => state.user);
  const { theme } = useTheme();

  useEffect(() => {
    if (ACCESS_TOKEN) {
      me.getMe();
    }
  }, [ACCESS_TOKEN]);

  const onRefresh = () => {
    setRefreshing(true);
    if (ACCESS_TOKEN) {
      me.getMe();
    }
    setRefreshing(false);
  };

  return (
    <S.Container>
      <StackHeader title="프로필 수정" />
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
        <Pressable
          style={{ flex: 1, width: "100%" }}
          onPress={Keyboard.dismiss}
        >
          <KeyboardAwareScrollView style={{ flex: 1, width: "100%" }}>
            <S.Main>
              <S.SectionTitle>닉네임</S.SectionTitle>
              <EditNickname user={user} />
              <S.SeperLine color={theme.borderColor} />

              <S.SectionTitle>링크업 아이디</S.SectionTitle>
              <S.SectionSubTitle>
                링크업 아이디는 90일에 한번 변경 가능합니다
              </S.SectionSubTitle>
              <EditLinkupId user={user} />
              <S.SeperLine color={theme.borderColor} />

              <S.SectionTitle>비밀번호</S.SectionTitle>
              <EditPassword/>
              <S.SeperLine color={theme.borderColor} />

              <S.SectionTitle>프로필사진</S.SectionTitle>
              <EditProfileImg user={user} />
              <S.SeperLine color={theme.borderColor} />

              <S.SectionTitle>상태메시지</S.SectionTitle>
              <EditStatusMessage user={user} />
            </S.Main>
          </KeyboardAwareScrollView>
        </Pressable>
      </ScrollView>
    </S.Container>
  );
};

export default EditProfile;
