import { Ionicons } from "@expo/vector-icons";
import StackHeader from "../../stackHeader";
import * as S from "./style";
import { useTheme } from "../../../context/theme/themeContext";
import { Text } from "react-native";
import useGetFriendDetail from "../../../hooks/friends/useGetFriendDetail";
import { useEffect } from "react";
import Skeleton from "../../skeleton";

const FriendDetail = ({route}:any) => {
  const { theme } = useTheme();
  const { linkupId } = route.params
  const { ...friendDetail } = useGetFriendDetail();

  useEffect(()=>{
    friendDetail.getFriendDetail(linkupId);
  },[linkupId]);

  return (
    <S.Container>
      <StackHeader title={friendDetail.friendDetail.nickname} />
      <S.Banner bg={friendDetail.friendDetail.profileImage}>
        {friendDetail.loading ? (
          <Skeleton width={100} height={100} style={{ borderRadius: 10 }} />
        ) : (
          <S.ProfilePicture src={friendDetail.friendDetail.profileImage} />
        )}
      </S.Banner>
      <S.InfoWrap>
        {friendDetail.loading ? (
          <Skeleton height={20} width={100} style={{ borderRadius: 5 }} />
        ) : (
          <S.Name>{friendDetail.friendDetail.nickname}</S.Name>
        )}
        {friendDetail.loading ? (
          <>
            <Skeleton
              height={10}
              width={140}
              style={{ borderRadius: 1, marginTop: 12 }}
            />
            <Skeleton
              height={10}
              width={140}
              style={{ borderRadius: 1, marginTop: 2 }}
            />
          </>
        ) : (
          <S.Status>{friendDetail.friendDetail.statusMessage}</S.Status>
        )}
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
