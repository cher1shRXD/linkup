import styled from "@emotion/native";
import { ThemedBox, ThemedText } from "../../theme";

export const Container = styled.View`
  width:100%;
  height:100px;
  display:flex;
  justify-content:space-between;
  align-items:center;
`
export const BirthdayWrap = styled(ThemedBox)`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  border-radius: 10px;
  padding: 0 20px;
`;
export const BirthdayText = styled(ThemedText)`
  font-size: 20px;
  font-weight: 500;
`;
export const Button = styled.TouchableOpacity<{ isDisabled: boolean }>`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background-color: ${(props) => (props.isDisabled ? "#135ba1" : "#1e90ff")};
`;
export const ButtonText = styled.Text<{ isDisabled: boolean }>`
  font-size: 15px;
  color: ${(props) => (props.isDisabled ? "#ccc" : "white")};
`;