import { TouchableOpacity } from "react-native";
import Header from "../../header";
import * as S from "./style";
import { ThemedText } from "../../theme";
import tokenStore from "../../../store/auth/tokenStore";
import { useTheme } from "../../../context/theme/themeContext";
import { Ionicons } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";

const Settings = () => {

  const clearTokens = tokenStore(state=>state.clearTokens);
  const navigation = useNavigation<NavigationProp<any>>();
  const { theme } = useTheme();

  return (
    <S.Container>
      <Header title="Settings" />
      <S.MenuWrap border={theme.borderColor}>
        <S.MenuBox
          border={theme.borderColor}
          isLast={false}
          activeOpacity={0.7}
          onPress={()=>{
            navigation.navigate("EditProfileScreen")
          }}
        >
          <ThemedText>프로필 수정</ThemedText>
          <Ionicons
            name="chevron-forward-outline"
            size={20}
            color={theme.textColor}
          />
        </S.MenuBox>
        <S.MenuBox
          border={theme.borderColor}
          onPress={clearTokens}
          isLast={true}
          activeOpacity={0.7}
        >
          <ThemedText style={{ color: "#982B1C" }}>로그아웃</ThemedText>
        </S.MenuBox>
      </S.MenuWrap>
    </S.Container>
  );
};

export default Settings;
