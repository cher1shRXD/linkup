import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../../context/theme/themeContext";
import StackHeader from "../../stackHeader";
import * as S from "./style";
import { Keyboard, Pressable, Text, TextInput, TouchableOpacity } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useRef } from "react";
import useSearchUser from "../../../hooks/friends/useSearchUser";
import useAddReq from "../../../hooks/friends/useAddReq";

const AddFriend = () => {
  const { theme } = useTheme();
  const { ...search } = useSearchUser();
  const { ...addUser } = useAddReq();
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
              onChangeText={search.handleSearchText}
              value={search.searchText}
            />
            <TouchableOpacity onPress={search.searchUser}>
              <Ionicons
                name="search-outline"
                size={30}
                color={theme.iconColor}
              />
            </TouchableOpacity>
          </S.SearchWrap>
          {search.isSearched && (
            <>
              {search.result.nickname.length > 0 ? (
                <S.SearchResultWrap>
                  <S.ProfileImg src={search.result.profileImage} />
                  <S.Nickname>{search.result.nickname}</S.Nickname>
                  {search.result.isFriend ? (
                    <S.AddBtn 
                      onPress={()=>{
                        addUser.addReq(search.result.linkupId);
                      }}
                      disabled={addUser.loading}
                    >
                      <S.ButtonText>채팅하기</S.ButtonText>
                    </S.AddBtn>
                  ) : (
                    <S.AddBtn>
                      <S.ButtonText>추가하기</S.ButtonText>
                    </S.AddBtn>
                  )}
                </S.SearchResultWrap>
              ) : (
                <Text style={{ color: theme.iconColor, marginTop: 30 }}>
                  해당 아이디를 가진 유저가 없습니다
                </Text>
              )}
            </>
          )}
        </S.Main>
      </Pressable>
    </S.Container>
  );
};

export default AddFriend;
