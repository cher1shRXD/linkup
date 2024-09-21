import { Ionicons } from "@expo/vector-icons";
import * as S from "./style";
import { useTheme } from "../../context/theme/themeContext";
import { TouchableOpacity } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import useGetFriendReq from "../../hooks/friends/useGetFriendReq";
import tokenStore from "../../store/auth/tokenStore";
import { useEffect, useState } from "react";

const Header = ({ title }: { title: string }) => {
  const { theme } = useTheme();
  const navigation = useNavigation<NavigationProp<any>>();
  const { ...friends } = useGetFriendReq();
  const ACCESS_TOKEN = tokenStore((state) => state.accessToken);
  const [unread, setUnread] = useState<boolean>(false);

  useEffect(() => {
    if (ACCESS_TOKEN) {
      friends.getFriendReq();
    }
  }, [ACCESS_TOKEN]);

  useEffect(() => {
    if (friends.requests.length > 0) {
      setUnread(true);
    } else {
      setUnread(false);
    }
  }, [friends.requests]);

  

  return (
    <S.Container>
      <S.HeaderText>{title}</S.HeaderText>
      <S.Filler />
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          navigation.navigate("NotiScreen");
        }}
      >
        <Ionicons
          name={
            unread ? "notifications-circle-outline" : "notifications-outline"
          }
          size={25}
          color={theme.textColor}
        />
      </TouchableOpacity>
    </S.Container>
  );
};

export default Header;
