import { Ionicons } from '@expo/vector-icons'
import * as S from './style'
import { useTheme } from '../../context/theme/themeContext'
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Text } from 'react-native';

const Tabs = ({state}:any) => {


  const navigation = useNavigation<NavigationProp<any>>();
  const { theme } = useTheme();
  const TAB_LIST = state.routeNames;
  const CURRENT_IDX = state.index;

  const focusTo = (idx: number) => {
    navigation.navigate(TAB_LIST[idx]);
  };

  return (
    <S.Container>
      <S.TabItem activeOpacity={1} onPress={() => focusTo(0)}>
        <Ionicons
          name={CURRENT_IDX === 0 ? "people" : "people-outline"}
          size={30}
          color={theme.iconColor}
        />
        <Text style={{ fontSize: 12, color: theme.iconColor }}>friends</Text>
      </S.TabItem>
      <S.TabItem activeOpacity={1} onPress={() => focusTo(1)}>
        <Ionicons
          name={CURRENT_IDX === 1 ? "chatbubble" : "chatbubble-outline"}
          size={30}
          color={theme.iconColor}
        />
        <Text style={{ fontSize: 12, color: theme.iconColor }}>chat</Text>
      </S.TabItem>
      <S.TabItem activeOpacity={1} onPress={() => focusTo(2)}>
        <Ionicons
          name={CURRENT_IDX === 2 ? "chatbubbles" : "chatbubbles-outline"}
          size={30}
          color={theme.iconColor}
        />
        <Text style={{ fontSize: 12, color: theme.iconColor }}>openchats</Text>
      </S.TabItem>
      <S.TabItem activeOpacity={1} onPress={() => focusTo(3)}>
        <Ionicons
          name={CURRENT_IDX === 3 ? "ellipsis-horizontal" : "ellipsis-horizontal-outline"}
          size={30}
          color={theme.iconColor}
        />
        <Text style={{ fontSize: 12, color: theme.iconColor }}>settings</Text>
      </S.TabItem>
    </S.Container>
  );
}

export default Tabs