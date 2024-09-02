import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../../context/theme/themeContext";
import StackHeader from "../../stackHeader";
import * as S from "./style";
import { Keyboard, Pressable, TextInput, TouchableOpacity } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useRef } from "react";

const AddFriend = () => {
  const { theme } = useTheme();
  const inputRef = useRef<TextInput | null>(null);

  useFocusEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  });

  return (
    <S.Container>
      <StackHeader title="친구추가" />
      <Pressable style={{ flex: 1, width: "100%" }} onPress={Keyboard.dismiss}>
        <S.Main>
          <S.SearchWrap style={{ borderBottomColor: theme.iconColor }}>
            <S.Input
              placeholder="아이디를 입력하세요"
              style={{ color: theme.textColor }}
              ref={inputRef}
            />
            <TouchableOpacity>
              <Ionicons
                name="search-outline"
                size={30}
                color={theme.iconColor}
              />
            </TouchableOpacity>
          </S.SearchWrap>
        </S.Main>
      </Pressable>
    </S.Container>
  );
};

export default AddFriend;
