import { useEffect, useState } from "react";
import useGetFriendReq from "../../hooks/friends/useGetFriendReq";
import StackHeader from "../stackHeader";
import * as S from "./style";
import { RefreshControl, ScrollView, Text } from "react-native";
import tokenStore from "../../store/auth/tokenStore";
import { useTheme } from "../../context/theme/themeContext";
import Skeleton from "../skeleton";
import { Ionicons } from "@expo/vector-icons";
import useAcceptReq from "../../hooks/friends/useAcceptReq";
import useRejectReq from "../../hooks/friends/useRejectReq";
import useGetFriends from "../../hooks/friends/useGetFriends";


const Notification = () => {
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const { ...friendReq } = useGetFriendReq();
  const { ...friends } = useGetFriends();
  const { acceptReq } = useAcceptReq();
  const { rejectReq } = useRejectReq();
  const ACCESS_TOKEN = tokenStore((state) => state.accessToken);
  const [loading,setLoading] = useState<boolean>(false);
  const { theme } = useTheme();

  useEffect(() => {
    if (ACCESS_TOKEN) {
      friendReq.getFriendReq();
    }
  }, []);

  useEffect(() => {
    return () => {
      const handleUnmount = async () => {
        await friends.getFriends();
      };

      handleUnmount();
    };
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    friendReq.getFriendReq();
    setRefreshing(false);
  };

  const accept = async (linkupId:string) => {
    setLoading(true);
    if(loading){
      return;
    }
    const res = await acceptReq(linkupId);
    if(res){
      await friendReq.getFriendReq();
    }
    setLoading(false);
  }

  const reject = async (linkupId: string) => {
    setLoading(true);
    if (loading) {
      return;
    }
    const res = await rejectReq(linkupId);
    if (res) {
      await friendReq.getFriendReq();
    }
    setLoading(false);
  };

  return (
    <S.Container>
      <StackHeader title="알림" />
      <ScrollView
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
        }
        style={{
          flex: 1,
          width: "100%",
        }}
      >
        {friendReq.loading && (
          <S.NotiWrap>
            <Skeleton width={80} height={80} style={{ borderRadius: 5 }} />
            <S.NotiBox>
              <S.NotiInfoWrap>
                <Skeleton width={180} height={20} style={{ borderRadius: 5 }} />
              </S.NotiInfoWrap>
              <S.NotiAcceptWrap>
                <Skeleton width={100} height={15} style={{ borderRadius: 5 }} />
              </S.NotiAcceptWrap>
            </S.NotiBox>
          </S.NotiWrap>
        )}
        {!friendReq.loading &&
          friendReq.requests.map((item, idx) => (
            <S.NotiWrap key={idx}>
              <S.ProfileImg src={item.profileImage} />
              <S.NotiBox>
                <S.NotiInfoWrap>
                  <S.ReqText>
                    {item.nickname}님이 친구가 되고싶어 합니다!
                  </S.ReqText>
                </S.NotiInfoWrap>
                <S.NotiAcceptWrap>
                  <S.AcceptBtn
                    style={{ backgroundColor: theme.boxColor }}
                    onPress={() => {
                      accept(item.linkupId);
                    }}
                    disabled={loading}
                  >
                    <Ionicons
                      name="person-add-outline"
                      size={20}
                      color={theme.iconColor}
                    />
                  </S.AcceptBtn>
                  <S.AcceptBtn
                    style={{ backgroundColor: theme.boxColor }}
                    onPress={() => {
                      reject(item.linkupId);
                    }}
                    disabled={loading}
                  >
                    <Ionicons
                      name="person-remove-outline"
                      size={20}
                      color={theme.iconColor}
                    />
                  </S.AcceptBtn>
                </S.NotiAcceptWrap>
              </S.NotiBox>
            </S.NotiWrap>
          ))}
        {!friendReq.loading && friendReq.requests.length === 0 && (
          <S.NoReq>
            <Text style={{ color: theme.iconColor, fontSize: 17 }}>
              받은 요청이 없습니다
            </Text>
          </S.NoReq>
        )}
      </ScrollView>
    </S.Container>
  );
};

export default Notification;
