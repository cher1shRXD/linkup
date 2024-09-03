import { Alert, Keyboard, Pressable } from "react-native";
import { useTheme } from "../../../context/theme/themeContext";
import StackHeader from "../../stackHeader";
import * as S from "./style";
import useSignup from "../../../hooks/auth/useSignup";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useState } from "react";
import { API_URL } from "@env";

const Phone = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const { theme } = useTheme();
  const { ...signup } = useSignup();
  const navigation = useNavigation<NavigationProp<any>>();

  const submit = async () => {
    setLoading(true);
    if (signup.signupData.phoneNumber.trim() === "") {
      Alert.alert("공백 방지", "공백을 제외한 1글자 이상 입력해주세요");
      setLoading(false);
      return;
    }
    try {
      const res = await axios.get(`${API_URL}/auth/check`, {
        params: {
          phoneNumber: "+8210" + signup.signupData.phoneNumber.split("010")[1],
        },
      });
      if (res && !res.data.data.phoneNumber) {
        navigation.navigate("NicknameScreen");
      } else {
        Alert.alert(
          "이미 사용중인 전화번호",
          "해당 전화번호가 이미 사용중입니다"
        );
      }
    } catch {
      Alert.alert("네트워크 에러");
    }
    setLoading(false);
  };

  return (
    <S.Container>
      <StackHeader title="뒤로가기" />
      <Pressable style={{ flex: 1, width: "100%" }} onPress={Keyboard.dismiss}>
        <S.Title>전화번호를 알려주세요</S.Title>
        <S.Subtitle>전화번호는 친구추가시 이용 됩니다.</S.Subtitle>
        <S.InputWrap>
          <S.Input
            style={{
              borderBottomColor: theme.textColor,
              color: theme.textColor,
            }}
            placeholder="'-' 없이 입력해주세요"
            value={signup.signupData.phoneNumber}
            onChangeText={(e) => {
              signup.handleSignupData(e, "phoneNumber");
            }}
          />
          <S.Filler></S.Filler>
          <S.Button activeOpacity={0.7} onPress={submit} disabled={loading}>
            <S.ButtonText>{loading ? "확인 중..." : "다음"}</S.ButtonText>
          </S.Button>
        </S.InputWrap>
      </Pressable>
    </S.Container>
  );
};

export default Phone;
