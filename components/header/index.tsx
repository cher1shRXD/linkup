import { Ionicons } from '@expo/vector-icons';
import * as S from './style'
import { useTheme } from '../../context/theme/themeContext';
import { TouchableOpacity } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';

const Header = ({title}:{title:string}) => {

  const { theme } = useTheme();
  const navigation = useNavigation<NavigationProp<any>>();

  return (
    <S.Container>
      <S.HeaderText>{title}</S.HeaderText>
      <TouchableOpacity activeOpacity={0.7} onPress={()=>{navigation.navigate('NotiScreen')}}>
        <Ionicons
          name="notifications-outline"
          size={25}
          color={theme.textColor}
        />
      </TouchableOpacity>
    </S.Container>
  );
}

export default Header