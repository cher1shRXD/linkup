import { NavigationProp, useNavigation } from "@react-navigation/native";
import { ThemedText, ThemedView } from "../../theme";
import * as S from './style';
import { useTheme } from "../../../context/theme/themeContext";

const GeneralChat = () => {

  const navigation = useNavigation<NavigationProp<any>>();

  const { theme } = useTheme(); 

  return (
    <S.Container>
      <S.Enter style={{backgroundColor:theme.boxColor}} onPress={()=>{navigation.navigate('GeneralChatRoom')}}>
        <ThemedText>입장하기</ThemedText>
      </S.Enter>
    </S.Container>
  )
};

export default GeneralChat;
