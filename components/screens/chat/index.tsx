import { SwipeListView } from "react-native-swipe-list-view";
import Header from "../../header";
import * as S from "./style";
import { RefreshControl, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import useGetChatList from "../../../hooks/chat/useGetChatList";
import { useTheme } from "../../../context/theme/themeContext";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import tokenStore from "../../../store/auth/tokenStore";

const Chat = () => {
  const { ...chatList } = useGetChatList();
  const { theme } = useTheme();
  const navigation = useNavigation<NavigationProp<any>>();
  const ACCESS_TOKEN = tokenStore(state=>state.accessToken);

  useEffect(() => {
    chatList.getChatList();
  }, [ACCESS_TOKEN]);

  const onRefresh = () => {
    chatList.getChatList();
  };

  return (
    <S.Container>
      <Header title="Chat" />
      <SwipeListView
        refreshControl={
          <RefreshControl refreshing={chatList.loading} onRefresh={onRefresh} />
        }
        data={chatList.chatList}
        style={{ flex: 1, width: "90%" }}
        renderItem={({ item, index }) => (
          <S.FriendBox
            border={theme.borderColor}
            bg={theme.backgroundColor}
            key={item.id}
            isLast={index === chatList.chatList.length - 1}
            activeOpacity={1}
            onPress={() => {
              navigation.navigate("PersonalChatRoom", { roomId: item.id });
            }}
          >
            <S.FriendPicture src={item.profileImage} />
            <S.FriendName>{item.name}</S.FriendName>
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
                
                chatList.getChatList();
              }}
            >
              <Ionicons name="trash-outline" size={24} color="white" />
            </TouchableOpacity>
          </S.HiddenItemWrap>
        )}
        rightOpenValue={-70}
        disableRightSwipe
        keyExtractor={(item) => item.id}
      />
    </S.Container>
  );
};

export default Chat;
