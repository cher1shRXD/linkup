import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useTheme } from '../../context/theme/themeContext';
import * as S from './style'
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '../theme';

const StackHeader = ({title,target}:{title:string,target?:string}) => {

  const { theme } = useTheme();
  const navigation = useNavigation<NavigationProp<any>>();

  return (
    <S.Header>
      <S.BackWrap
        onPress={
          target ? 
          () => {
            navigation.navigate(target);
          } : 
          () => {
            navigation.goBack();
          }}
      >
        <Ionicons
          name="chevron-back-outline"
          size={20}
          color={theme.textColor}
        />
        <ThemedText>{title}</ThemedText>
      </S.BackWrap>
    </S.Header>
  );
}

export default StackHeader