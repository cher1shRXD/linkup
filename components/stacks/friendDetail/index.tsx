import { Ionicons } from "@expo/vector-icons";
import StackHeader from "../../stackHeader";
import * as S from "./style";
import { useTheme } from "../../../context/theme/themeContext";
import { Text } from "react-native";

const FriendDetail = ({route}:any) => {
  const { theme } = useTheme();
  const { user } = route.params;

  return (
    <S.Container>
      <StackHeader title={user.nickname} />
      <S.Banner bg={user.profileImage}>
        <S.ProfilePicture src={user.profileImage} />
      </S.Banner>
      <S.InfoWrap>
        <S.Name>{user.nickname}</S.Name>
        <S.Status>{user.statusMessage}</S.Status>
        <S.GoChat>
          <Ionicons
            name="chatbox-ellipses-outline"
            size={45}
            color={theme.iconColor}
          />
          <Text style={{ color: theme.iconColor }}>채팅하기</Text>
        </S.GoChat>
      </S.InfoWrap>
    </S.Container>
  );
};

export default FriendDetail;
