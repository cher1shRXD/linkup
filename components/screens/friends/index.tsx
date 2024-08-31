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

const DummyFriend = [
  {
    nickname: "전민오",
    statusMessage: "나르샤하기 싫다",
  },
  {
    nickname: "전민오",
    statusMessage: "나르샤하기 싫다",
  },
  {
    nickname: "전민오",
    statusMessage: "나르샤하기 싫다",
  },
  {
    nickname: "전민오",
    statusMessage: "나르샤하기 싫다",
  },
  {
    nickname: "전민오",
    statusMessage: "나르샤하기 싫다",
  },
  {
    nickname: "전민오",
    statusMessage: "나르샤하기 싫다",
  },
  {
    nickname: "전민오",
    statusMessage: "나르샤하기 싫다",
  },
  {
    nickname: "전민오",
    statusMessage: "나르샤하기 싫다",
  },
  {
    nickname: "전민오",
    statusMessage: "나르샤하기 싫다",
  },
  {
    nickname: "전민오",
    statusMessage: "나르샤하기 싫다",
  },
  {
    nickname: "전민오",
    statusMessage: "나르샤하기 싫다",
  },
  {
    nickname: "전민오",
    statusMessage: "나르샤하기 싫다",
  },
  {
    nickname: "전민오",
    statusMessage: "나르샤하기 싫다",
  },
  {
    nickname: "전민오",
    statusMessage: "나르샤하기 싫다",
  },
  {
    nickname: "전민오",
    statusMessage: "나르샤하기 싫다",
  },
];

const Friends = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { theme } = useTheme();
  const { ...me } = useGetMe();

  const user = userStore((state) => state.user);
  const ACCESS_TOKEN = tokenStore((state) => state.accessToken);

  const navigation = useNavigation<NavigationProp<any>>();

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
      <Header title="Friends" />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={{ flex: 1, width: "100%", paddingHorizontal: 15 }}
      >
        <S.SectionTitle>내 프로필</S.SectionTitle>
        <S.MyInfoWrap>
          {me.loading ? (
            <Skeleton width={70} height={70} style={{ borderRadius: 5 }} />
          ) : (
            <S.MyProfilePicture src={user.profileImage} />
          )}
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
          {DummyFriend.map((item, idx) => (
            <S.FriendBox
              border={theme.borderColor}
              key={idx}
              isLast={idx === DummyFriend.length - 1}
              onPress={() => {
                navigation.navigate("FriendDetail"), { id: 1 };
              }}
            >
              <S.FriendPicture></S.FriendPicture>
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
