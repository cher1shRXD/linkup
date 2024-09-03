import { Alert, Keyboard, Pressable, TouchableOpacity } from "react-native";
import { useTheme } from "../../../context/theme/themeContext";
import StackHeader from "../../stackHeader";
import * as S from "./style";
import useSignup from "../../../hooks/auth/useSignup";
import { ThemedText } from "../../theme";
import { Ionicons } from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useState } from "react";

const Personal = () => {
  const { theme } = useTheme();
  const { ...signup } = useSignup();

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const formatDate = (date: Date | null) => {
    if (date) {
      let year = date.getFullYear();
      let month = (date.getMonth() + 1).toString().padStart(2, "0");
      let day = date.getDate().toString().padStart(2, "0");

      return `${year}-${month}-${day}`;
    }
  };

  const handleConfirm = (selectedDate: Date) => {
    hideDatePicker();
    const date = formatDate(selectedDate);
    if(date){
      signup.handleSignupData(date, "birthday");
    }
  };

  const changeGender = (gender: string) => {
    signup.handleSignupData(gender, "gender");
  };

  const submit = () => {
    if (!signup.signupData.birthday || signup.signupData.gender === "") {
      Alert.alert("공백 방지", "모든 필드를 입력해주세요.");
      return;
    }
    signup.submit();
  };

  return (
    <S.Container>
      <StackHeader title="뒤로가기" />
      <Pressable style={{ flex: 1, width: "100%" }} onPress={Keyboard.dismiss}>
        <S.Title>개인정보 수집</S.Title>
        <S.InputWrap>
          <S.Subtitle>성별을 선택해주세요</S.Subtitle>
          <S.GenderWrap>
            <S.GenderBox
              style={{ backgroundColor: theme.boxColor }}
              activeOpacity={0.7}
              isSelected={signup.signupData.gender === "MALE"}
              onPress={() => {
                changeGender("MALE");
              }}
            >
              <Ionicons
                name={
                  signup.signupData.gender === "MALE" ? "man" : "man-outline"
                }
                size={32}
                color={
                  signup.signupData.gender === "MALE"
                    ? "#1E90FF"
                    : theme.iconColor
                }
              />
              <S.GenderText
                style={
                  signup.signupData.gender === "MALE"
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
              isSelected={signup.signupData.gender === "FEMALE"}
              onPress={() => {
                changeGender("FEMALE");
              }}
            >
              <Ionicons
                name={
                  signup.signupData.gender === "FEMALE"
                    ? "woman"
                    : "woman-outline"
                }
                size={32}
                color={
                  signup.signupData.gender === "FEMALE"
                    ? "#1E90FF"
                    : theme.iconColor
                }
              />
              <S.GenderText
                style={
                  signup.signupData.gender === "FEMALE"
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
              isSelected={signup.signupData.gender === "OTHER"}
              onPress={() => {
                changeGender("OTHER");
              }}
            >
              <Ionicons
                name={
                  signup.signupData.gender === "OTHER"
                    ? "heart-half"
                    : "heart-half-outline"
                }
                size={32}
                color={
                  signup.signupData.gender === "OTHER"
                    ? "#1E90FF"
                    : theme.iconColor
                }
              />
              <S.GenderText
                style={
                  signup.signupData.gender === "OTHER"
                    ? { color: "#1E90FF" }
                    : { color: theme.iconColor }
                }
              >
                그 외
              </S.GenderText>
            </S.GenderBox>
          </S.GenderWrap>
          <S.Subtitle>생년월일을 입력해주세요</S.Subtitle>
          <TouchableOpacity onPress={showDatePicker}>
            {signup.signupData.birthday ? (
              <S.BirthdayWrap>
                <S.BirthdayText>
                  {signup.signupData.birthday &&
                    signup.signupData.birthday
                      .split("-")[0] + "년 "}
                </S.BirthdayText>
                <S.BirthdayText>
                  {signup.signupData.birthday &&
                    signup.signupData.birthday
                      .split("-")[1] + "월 "}
                </S.BirthdayText>
                <S.BirthdayText>
                  {signup.signupData.birthday &&
                    signup.signupData.birthday
                      .split("-")[2] + "일 "}
                </S.BirthdayText>
              </S.BirthdayWrap>
            ) : (
              <S.BirthdayWrap>
                <ThemedText>날짜 선택</ThemedText>
              </S.BirthdayWrap>
            )}
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
          <S.Filler></S.Filler>
          <S.Button activeOpacity={0.7} onPress={submit} disabled={signup.loading}>
            <S.ButtonText style={{ color: "white" }}>{signup.loading ? "회원가입 중..." : "완료하기"}</S.ButtonText>
          </S.Button>
        </S.InputWrap>
      </Pressable>
    </S.Container>
  );
};

export default Personal;
