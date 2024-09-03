import { RefreshControl, ScrollView, TouchableOpacity } from "react-native";
import Header from "../../header";
import * as S from "./style";
import { useCallback, useEffect, useState } from "react";
import { useTheme } from "../../../context/theme/themeContext";
import { Ionicons } from "@expo/vector-icons";
import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
} from "@react-navigation/native";
import Skeleton from "../../skeleton";
import useGetMe from "../../../hooks/user/useGetMe";
import { userStore } from "../../../store/auth/userStore";
import tokenStore from "../../../store/auth/tokenStore";
import useGetFriends from "../../../hooks/friends/useGetFriends";

const Friends = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { theme } = useTheme();
  const { ...me } = useGetMe();
  const { ...friends } = useGetFriends();
  const [imageLoading, setImageLoading] = useState<boolean>(false);

  const user = userStore((state) => state.user);
  const ACCESS_TOKEN = tokenStore((state) => state.accessToken);

  const navigation = useNavigation<NavigationProp<any>>();

  useEffect(() => {
    if (ACCESS_TOKEN) {
      me.getMe();
      friends.getFriends();
    }
  }, [ACCESS_TOKEN]);


  const onRefresh = () => {
    setRefreshing(true);
    if (ACCESS_TOKEN) {
      me.getMe();
      friends.getFriends();
    }
    setRefreshing(false);
  };

  return (
    <S.Container>
      <Header title="Friends" />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={{ flex: 1, width: "100%", paddingHorizontal: 15 }}
      >
        <S.SectionTitle>내 프로필</S.SectionTitle>
        <S.MyInfoWrap>
          {(me.loading || imageLoading) && (
            <Skeleton width={70} height={70} style={{ borderRadius: 5 }} />
          )}
          <S.MyProfilePicture
            src={user.profileImage}
            onLoadStart={() => {
              setImageLoading(true);
            }}
            onLoadEnd={() => {
              setImageLoading(false);
            }}
            style={(me.loading || imageLoading) ? {height:0,width:0}:{height:70,width:70}}
          />
          <S.MyInfo>
            {me.loading ? (
              <Skeleton width={100} height={20} style={{ borderRadius: 5 }} />
            ) : (
              <S.MyName>{user.nickname}</S.MyName>
            )}
            {me.loading ? (
              <Skeleton
                width={90}
                height={15}
                style={{ borderRadius: 5, marginTop: 10 }}
              />
            ) : (
              <S.MyStatus>{user.statusMessage}</S.MyStatus>
            )}
          </S.MyInfo>
        </S.MyInfoWrap>
        <S.SectionTitle>친구</S.SectionTitle>
        <S.FriendsWrap>
          {friends.loading ? (
            <S.FriendBox
              border={theme.borderColor}
              key={0}
              isLast={false}
              onPress={() => {
                navigation.navigate("FriendDetail"), { id: 1 };
              }}
            >
              <Skeleton width={50} height={50} style={{ borderRadius: 5 }} />
              <S.FriendInfo>
                <Skeleton width={100} height={20} style={{ borderRadius: 5 }} />
                <Skeleton
                  width={90}
                  height={15}
                  style={{ borderRadius: 5, marginTop: 10 }}
                />
              </S.FriendInfo>
            </S.FriendBox>
          ) : null}
          {friends.loading && (
            <S.FriendBox
              border={theme.borderColor}
              key={1}
              isLast={false}
              onPress={() => {
                navigation.navigate("FriendDetail"), { id: 1 };
              }}
            >
              <Skeleton width={50} height={50} style={{ borderRadius: 5 }} />
              <S.FriendInfo>
                <Skeleton width={100} height={20} style={{ borderRadius: 5 }} />
                <Skeleton
                  width={90}
                  height={15}
                  style={{ borderRadius: 5, marginTop: 10 }}
                />
              </S.FriendInfo>
            </S.FriendBox>
          )}
          {friends.loading && (
            <S.FriendBox
              border={theme.borderColor}
              key={2}
              isLast={false}
              onPress={() => {
                navigation.navigate("FriendDetail"), { id: 1 };
              }}
            >
              <Skeleton width={50} height={50} style={{ borderRadius: 5 }} />
              <S.FriendInfo>
                <Skeleton width={100} height={20} style={{ borderRadius: 5 }} />
                <Skeleton
                  width={90}
                  height={15}
                  style={{ borderRadius: 5, marginTop: 10 }}
                />
              </S.FriendInfo>
            </S.FriendBox>
          )}
          {!friends.loading &&
            friends.friends.map((item, idx) => (
              <S.FriendBox
                border={theme.borderColor}
                key={idx}
                isLast={idx === friends.friends.length - 1}
                onPress={() => {
                  navigation.navigate("FriendDetail", { user: item });
                }}
              >
                <S.FriendPicture src={item.profileImage} />
                <S.FriendInfo>
                  <S.FriendName>{item.nickname}</S.FriendName>
                  <S.FriendStatus>{item.statusMessage}</S.FriendStatus>
                </S.FriendInfo>
              </S.FriendBox>
            ))}
        </S.FriendsWrap>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("AddFriend");
          }}
        >
          <S.AddFriend>
            <Ionicons name="add-outline" size={20} color={theme.textColor} />
          </S.AddFriend>
        </TouchableOpacity>
      </ScrollView>
    </S.Container>
  );
};

export default Friends;
