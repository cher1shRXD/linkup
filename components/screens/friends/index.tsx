import { RefreshControl, ScrollView, TouchableOpacity } from "react-native";
import Header from "../../header";
import * as S from "./style";
import { useState } from "react";
import { useTheme } from "../../../context/theme/themeContext";
import { Ionicons } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";


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
  const navigation = useNavigation<NavigationProp<any>>()

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
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
          <S.MyProfilePicture></S.MyProfilePicture>
          <S.MyInfo>
            <S.MyName>김태우</S.MyName>
            <S.MyStatus>아 학교가기 싫다</S.MyStatus>
          </S.MyInfo>
        </S.MyInfoWrap>
        <S.SectionTitle>친구</S.SectionTitle>
        <S.FriendsWrap>
          {DummyFriend.map((item, idx) => (
            <S.FriendBox
              border={theme.borderColor}
              key={idx}
              isLast={idx === DummyFriend.length - 1}
              onPress={()=>{navigation.navigate('FriendDetail'),{id:1}}}
            >
              <S.FriendPicture></S.FriendPicture>
              <S.FriendInfo>
                <S.FriendName>{item.nickname}</S.FriendName>
                <S.FriendStatus>{item.statusMessage}</S.FriendStatus>
              </S.FriendInfo>
            </S.FriendBox>
          ))}
        </S.FriendsWrap>
        <TouchableOpacity onPress={()=>{navigation.navigate('AddFriend')}}>
          <S.AddFriend>
            <Ionicons name="add-outline" size={20} color={theme.textColor} />
          </S.AddFriend>
        </TouchableOpacity>
      </ScrollView>
    </S.Container>
  );
};

export default Friends;
