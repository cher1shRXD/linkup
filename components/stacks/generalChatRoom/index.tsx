import { useEffect, useRef, useState } from "react";
import * as S from "./style";
import { CompatClient, Stomp } from "@stomp/stompjs";
import tokenStore from "../../../store/auth/tokenStore";
import { API_URL, WS_URL } from "../../../constants";
import axios from "axios";
import StackHeader from "../../stackHeader";
import { useTheme } from "../../../context/theme/themeContext";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { ThemedText } from "../../theme";
import { Chat } from "../../../types/chat/chat.type";
import { userStore } from "../../../store/auth/userStore";
import { Ionicons } from "@expo/vector-icons";

const GeneralChatRoom = () => {
  const stompClient = useRef<CompatClient | null>(null);
  const accessToken = tokenStore((state) => state.accessToken);
  const { theme } = useTheme();
  const [messages, setMessages] = useState<Chat[]>([]);
  const [content, setContent] = useState<string>("");
  const user = userStore((state) => state.user);
  const scrollViewRef = useRef<FlatList|null>(null);

  const connect = async () => {
    const websocket = new WebSocket(WS_URL);
    stompClient.current = Stomp.over(() => websocket);
    stompClient.current.connect(
      { Authorization: accessToken },
      () => {
        stompClient.current!.subscribe(
          `/exchange/linkup.exchange/room.general`,
          (message) => {
            const newMessage = JSON.parse(message.body);
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
        { Authorization: accessToken },
        JSON.stringify({ content })
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
      const { data } = await axios.get(`${API_URL}/chat-messages/general`, {
        headers: { Authorization: accessToken },
      });
      setMessages(data.data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleContent = (e: string) => {
    setContent(e);
  };

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  useEffect(() => {
    connect();
    getMessages();

    return () => {
      disconnect();
    };
  }, []);

  const renderItem = ({ item }: { item: Chat }) => {
    const isMe = item.sender.linkupId === user.linkupId;
    const isSequence =
      messages.findIndex((msg) => msg.id === item.id) > 0 &&
      messages[messages.findIndex((msg) => msg.id === item.id) - 1].sender
        .linkupId === item.sender.linkupId;

    return (
      <S.ChatBoxArea
        style={{
          width:'100%',
          justifyContent: isMe ? "flex-end" : "flex-start",
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
        <FlatList
          data={messages}
          style={{ width: "100%", flex: 1,paddingHorizontal:10 }}
          renderItem={renderItem}
          keyExtractor={(item) => String(item.id)}
          ref={scrollViewRef}
        />
        <S.Filler />
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
