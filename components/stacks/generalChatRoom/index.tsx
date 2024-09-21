import { useEffect, useRef, useState } from "react";
import * as S from "./style";
import { CompatClient, Stomp } from "@stomp/stompjs";
import tokenStore from "../../../store/auth/tokenStore";
import { WS_URL } from "../../../constants";
import StackHeader from "../../stackHeader";
import { useTheme } from "../../../context/theme/themeContext";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from "react-native";
import { ThemedText } from "../../theme";
import { Chat } from "../../../types/chat/chat.type";
import { userStore } from "../../../store/auth/userStore";
import { Ionicons } from "@expo/vector-icons";
import instance from "../../../libs/axios/instance";

const GeneralChatRoom = () => {
  const stompClient = useRef<CompatClient | null>(null);
  const accessToken = tokenStore((state) => state.accessToken);
  const { theme } = useTheme();
  const [messages, setMessages] = useState<Chat[]>([]);
  const [content, setContent] = useState<string>("");
  const user = userStore((state) => state.user);
  const flatListRef = useRef<FlatList | null>(null);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const ACCESS_TOKEN = tokenStore(state=>state.accessToken);

  const connect = async () => {
    stompClient.current = Stomp.client(WS_URL);
    stompClient.current.connect(
      { Authorization: accessToken },
      () => {
        stompClient.current!.subscribe(
          `/exchange/linkup.exchange/room.general`,
          (message) => {
            const newMessage = JSON.parse(message.body);
            console.log(newMessage);
            setMessages((prevMessages) => [...prevMessages, newMessage]);
          }
        );
      },
      (error: Error) => {
        console.error(error);
        stompClient.current = null;
      }
    );
  };

  const sendMessage = () => {
    if (stompClient.current && content.trim().length !== 0) {
      stompClient.current.send(
        "/pub/send-general-message",
        {Authorization:ACCESS_TOKEN},
        JSON.stringify({ content }),
      );
      setContent("");
    }
  };

  const disconnect = () => {
    if (stompClient.current) {
      stompClient.current.disconnect(() => {
        console.log(`Disconnected from general chat`);
      });
    }
  };

  const getMessages = async () => {
    try {
      const { data } = await instance.get(`/chat-messages/general`);
      setMessages(data.data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleContent = (e: string) => {
    setContent(e);
  };

  useEffect(() => {
    connect();
    getMessages();

    return () => {
      disconnect();
    };
  }, []);

  useEffect(()=>{
    setTimeout(()=>{
      flatListRef.current?.scrollToEnd();
    },200);
  },[messages]);

  const handleScroll = (event: any) => {
    const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
    const atBottom =
      contentOffset.y + layoutMeasurement.height >= contentSize.height - 20;

    setIsAtBottom(atBottom);
  };

  const renderItem = ({ item }: { item: Chat }) => {
    const isMe = item.sender.linkupId === user.linkupId;
    const isSequence =
      messages.findIndex((msg) => msg.id === item.id) > 0 &&
      messages[messages.findIndex((msg) => msg.id === item.id) - 1].sender
        .linkupId === item.sender.linkupId;

    return (
      <S.ChatBoxArea
        style={{
          width: "100%",
          justifyContent: "flex-end",
          flexDirection: isMe ? "row" : "row-reverse",
        }}
      >
        {isMe ? (
          <S.MyChat>
            <ThemedText>{item.content}</ThemedText>
          </S.MyChat>
        ) : (
          <S.OtherChat>
            <ThemedText>{item.content}</ThemedText>
          </S.OtherChat>
        )}
        {!isSequence ? (
          <S.Profile src={item.sender.profileImage} />
        ) : (
          <S.FillerProfile />
        )}
      </S.ChatBoxArea>
    );
  };

  return (
    <S.Container>
      <StackHeader title="General Chat" />
      <KeyboardAvoidingView
        style={{ flex: 1, width: "100%" }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <SafeAreaView style={{ width: "100%", flex: 1 }}>
          {messages.length > 0 && (
            <FlatList
              data={messages}
              style={{
                width: "100%",
                flex: 1,
                paddingHorizontal: 10,
              }}
              renderItem={renderItem}
              keyExtractor={(item) => String(item.id)}
              ref={flatListRef}
              onScroll={handleScroll}
              bounces={false} 
              overScrollMode="never"
              initialScrollIndex={messages.length - 1}
              getItemLayout={(data, index) => ({
                length: 50, 
                offset: 50 * index,
                index,
              })}
            />
          )}
        </SafeAreaView>
        <S.TextInputWrap color={theme.borderColor}>
          <S.Input
            style={{
              backgroundColor: theme.boxColor,
              color: theme.textColor,
            }}
            placeholder="Enter message"
            value={content}
            onChangeText={handleContent}
            multiline
          />
          <S.SendButton
            disabled={content.trim().length === 0}
            onPress={sendMessage}
          >
            <Ionicons
              name="paper-plane-outline"
              size={20}
              color={theme.iconColor}
            />
          </S.SendButton>
        </S.TextInputWrap>
      </KeyboardAvoidingView>
    </S.Container>
  );
};

export default GeneralChatRoom;
