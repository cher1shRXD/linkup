import { useEffect, useRef, useState } from "react";
import * as S from "./style";
import { CompatClient, Stomp } from "@stomp/stompjs";
import tokenStore from "../../../store/auth/tokenStore";
import { API_URL, WS_URL } from "../../../constants";
import axios from "axios";
import StackHeader from "../../stackHeader";
import { useTheme } from "../../../context/theme/themeContext";
import { Ionicons } from "@expo/vector-icons";
import { KeyboardAvoidingView, Platform } from "react-native";
import { ThemedText } from "../../theme";
import { Chat } from "../../../types/chat/chat.type";
import { userStore } from "../../../store/auth/userStore";

const GeneralChatRoom = () => {
  const stompClient = useRef<CompatClient | null>(null);
  const accessToken = tokenStore((state) => state.accessToken);
  const { theme } = useTheme();
  const [messages, setMessages] = useState<Chat[]>([]);
  const user = userStore(state=>state.user);

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

            setMessages((prevMessage) => [...prevMessage, newMessage]);
          }
        );
      },
      (error: Error) => {
        console.error(error);

        stompClient.current = null;
      }
    );
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
        headers: {
          Authorization: accessToken,
        },
      });

      console.log(data.data);

      setMessages(data.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    connect();
    getMessages();

    return () => {
      disconnect();
    };
  }, []);

  return (
    <S.Container>
      <StackHeader title="general chat" />
      <KeyboardAvoidingView
        style={{ flex: 1, width: "100%" }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <S.ChatWrap>
          {messages.map((item, idx) => (
            <S.ChatBoxArea>
              {user.linkupId === item.sender.linkupId ? (
                <>
                  <S.MyChat>
                    <ThemedText>{item.content}</ThemedText>
                  </S.MyChat>
                  {idx !== 0 &&
                  messages[idx - 1].sender.linkupId === item.sender.linkupId ? (
                    <S.FillerProfile />
                  ) : (
                    <S.Profile src={item.sender.profileImage} />
                  )}
                </>
              ) : (
                <>
                  {idx !== 0 &&
                  messages[idx - 1].sender.linkupId === item.sender.linkupId ? (
                    <S.FillerProfile />
                  ) : (
                    <S.Profile src={item.sender.profileImage} />
                  )}

                  <S.OtherChat>
                    <ThemedText>{item.content}</ThemedText>
                  </S.OtherChat>
                </>
              )}
            </S.ChatBoxArea>
          ))}
        </S.ChatWrap>
        <S.TextInputWrap color={theme.borderColor}>
          <S.Input
            style={{
              backgroundColor: theme.boxColor,
              color: theme.textColor,
            }}
            placeholder="메시지를 입력하세요"
          />
          <S.SendButton>
            <Ionicons
              name="paper-plane-outline"
              size={30}
              color={theme.iconColor}
            />
          </S.SendButton>
        </S.TextInputWrap>
      </KeyboardAvoidingView>
    </S.Container>
  );
};

export default GeneralChatRoom;
