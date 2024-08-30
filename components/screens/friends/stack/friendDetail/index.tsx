import { Ionicons } from "@expo/vector-icons";
import StackHeader from "../../../../stackHeader";
import * as S from "./style";
import { useTheme } from "../../../../../context/theme/themeContext";
import { Text } from "react-native";

const FriendDetail = () => {

  const { theme } = useTheme();

  return (
    <S.Container>
      <StackHeader title="전민오" />
      <S.Banner>
        <S.ProfilePicture></S.ProfilePicture>
      </S.Banner>
      <S.InfoWrap>
        <S.Name>전민오</S.Name>
        <S.Status>나르샤하기 싫다</S.Status>
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
