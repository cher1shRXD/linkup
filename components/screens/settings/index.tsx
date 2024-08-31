import { TouchableOpacity } from "react-native";
import Header from "../../header";
import * as S from "./style";
import { ThemedText } from "../../theme";
import tokenStore from "../../../store/auth/tokenStore";

const Settings = () => {

  const clearTokens = tokenStore(state=>state.clearTokens);

  return (
    <S.Container>
      <Header title="Settings"/>
      <TouchableOpacity onPress={clearTokens}>
        <ThemedText>로그아웃</ThemedText>
      </TouchableOpacity>
    </S.Container>
  );
};

export default Settings;
