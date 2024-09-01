import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../../context/theme/themeContext'
import { User } from '../../../types/auth/user.type'
import * as S from './style'
import useChangeGender from '../../../hooks/user/useChangeGender';
import useGetMe from '../../../hooks/user/useGetMe';
import { useEffect } from 'react';

const EditGender = ({user}:{user:User}) => {

  const { ...me } = useGetMe();
  const { theme } = useTheme();
  const { ...gender } = useChangeGender();

  useEffect(()=>{
    gender.handleGender(user.gender as "MALE"|"FEMALE"|"OTHER");
  },[]);

  const submit = async () => {
    const res = await gender.submit();
    if(res){
      me.getMe();
    }
  }

  return (
    <S.Container>
      <S.GenderWrap>
        <S.GenderBox
          style={{ backgroundColor: theme.boxColor }}
          activeOpacity={0.7}
          isSelected={gender.newGender === "MALE"}
          onPress={() => {
            gender.handleGender("MALE");
          }}
        >
          <Ionicons
            name={gender.newGender === "MALE" ? "man" : "man-outline"}
            size={32}
            color={gender.newGender === "MALE" ? "#1E90FF" : theme.iconColor}
          />
          <S.GenderText
            style={
              gender.newGender === "MALE"
                ? { color: "#1E90FF" }
                : { color: theme.iconColor }
            }
          >
            남자
          </S.GenderText>
        </S.GenderBox>
        <S.GenderBox
          style={{ backgroundColor: theme.boxColor }}
          activeOpacity={0.7}
          isSelected={gender.newGender === "FEMALE"}
          onPress={() => {
            gender.handleGender("FEMALE");
          }}
        >
          <Ionicons
            name={gender.newGender === "FEMALE" ? "woman" : "woman-outline"}
            size={32}
            color={gender.newGender === "FEMALE" ? "#1E90FF" : theme.iconColor}
          />
          <S.GenderText
            style={
              gender.newGender === "FEMALE"
                ? { color: "#1E90FF" }
                : { color: theme.iconColor }
            }
          >
            여자
          </S.GenderText>
        </S.GenderBox>
        <S.GenderBox
          style={{ backgroundColor: theme.boxColor }}
          activeOpacity={0.7}
          isSelected={gender.newGender === "OTHER"}
          onPress={() => {
            gender.handleGender("OTHER");
          }}
        >
          <Ionicons
            name={
              gender.newGender === "OTHER" ? "heart-half" : "heart-half-outline"
            }
            size={32}
            color={gender.newGender === "OTHER" ? "#1E90FF" : theme.iconColor}
          />
          <S.GenderText
            style={
              gender.newGender === "OTHER"
                ? { color: "#1E90FF" }
                : { color: theme.iconColor }
            }
          >
            그 외
          </S.GenderText>
        </S.GenderBox>
      </S.GenderWrap>

      <S.Button
        isDisabled={gender.newGender === user.gender}
        onPress={submit}
        disabled={gender.newGender === user.gender}
      >
        <S.ButtonText isDisabled={gender.newGender === user.gender}>
          {gender.loading ? "변경 중..." : "변경"}
        </S.ButtonText>
      </S.Button>
    </S.Container>
  );
}

export default EditGender