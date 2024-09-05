import { Ionicons } from "@expo/vector-icons";
import StackHeader from "../../stackHeader";
import * as S from "./style";
import { useTheme } from "../../../context/theme/themeContext";
import { Text } from "react-native";
import { useState } from "react";
import Skeleton from "../../skeleton";

const FriendDetail = ({ route }: any) => {
  const { theme } = useTheme();
  const { user } = route.params;
  const [imageLoading, setImageLoading] = useState<boolean>(false);

  return (
    <S.Container>
      <StackHeader title={user.nickname} />
      <S.Banner>
        {imageLoading && (
          <Skeleton width={100} height={100} style={{ borderRadius: 10 }} />
        )}
        <S.ProfilePicture
          src={user.profileImage}
          onLoadStart={() => {
            setImageLoading(true);
          }}
          onLoadEnd={() => {
            setImageLoading(false);
          }}
          style={
            imageLoading ? { width: 0, height: 0 } : { width: 100, height: 100 }
          }
        />
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
