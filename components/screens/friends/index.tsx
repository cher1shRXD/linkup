import { RefreshControl, TouchableOpacity } from "react-native";
import Header from "../../header";
import * as S from "./style";
import { useEffect, useState } from "react";
import { useTheme } from "../../../context/theme/themeContext";
import { Ionicons } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import Skeleton from "../../skeleton";
import useGetMe from "../../../hooks/user/useGetMe";
import { userStore } from "../../../store/auth/userStore";
import tokenStore from "../../../store/auth/tokenStore";
import useGetFriends from "../../../hooks/friends/useGetFriends";
import { SwipeListView } from "react-native-swipe-list-view";
import useDeleteFriend from "../../../hooks/friends/useDeleteFriend";


const Friends = () => {
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const { theme } = useTheme();
  const { ...me } = useGetMe();
  const { ...friends } = useGetFriends();
  const { submit } = useDeleteFriend();
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
      <SwipeListView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        data={friends.friends}
        style={{ flex: 1, width: "90%" }}
        ListHeaderComponent={
          <>
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
                style={{
                  display: me.loading || imageLoading ? "none" : "flex",
                }}
              />
              <S.MyInfo>
                {me.loading ? (
                  <>
                    <Skeleton
                      width={100}
                      height={20}
                      style={{ borderRadius: 5 }}
                    />
                    <Skeleton
                      width={90}
                      height={15}
                      style={{ borderRadius: 5, marginTop: 10 }}
                    />
                  </>
                ) : (
                  <>
                    <S.MyName>{user.nickname}</S.MyName>
                    <S.MyStatus>{user.statusMessage}</S.MyStatus>
                  </>
                )}
              </S.MyInfo>
            </S.MyInfoWrap>
            <S.SectionTitle>친구</S.SectionTitle>
          </>
        }
        renderItem={({ item, index }) => (
          <S.FriendBox
            border={theme.borderColor}
            bg={theme.boxColor}
            key={item.linkupId}
            isLast={index === friends.friends.length - 1}
            activeOpacity={1}
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
        )}
        renderHiddenItem={({ item }) => (
          <S.HiddenItemWrap>
            <TouchableOpacity
              style={{
                backgroundColor: "red",
                justifyContent: "center",
                alignItems: "flex-end",
                height: "100%",
                paddingHorizontal: 20,
              }}
              onPress={() => {
                submit(item.linkupId);
                friends.getFriends();
              }}
            >
              <Ionicons name="trash-outline" size={24} color="white" />
            </TouchableOpacity>
          </S.HiddenItemWrap>
        )}
        rightOpenValue={-70}
        disableRightSwipe
        keyExtractor={(item) => item.linkupId}
        ListFooterComponent={
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("AddFriend");
            }}
          >
            <S.AddFriend>
              <Ionicons name="add-outline" size={20} color={theme.textColor} />
            </S.AddFriend>
          </TouchableOpacity>
        }
      />
    </S.Container>
  );
};

export default Friends;
