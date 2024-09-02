import styled from "@emotion/native";
import { ThemedBox, ThemedText, ThemedView } from "../../theme";

export const Container = styled(ThemedView)`
  width: 100%;
  flex: 1;
  align-items: center;
  padding: 0 0 40px 0;
`;
export const Filler = styled.View`
  flex:1;
`
export const Title = styled(ThemedText)`
  font-size:20px;
  font-weight:600;
  align-self:flex-start;
  margin: 20px;
`
export const InputWrap = styled.View`
  padding: 0 20px;
  width:100%;
  flex:1;
`
export const Input = styled.TextInput`
  width:100%;
  border-bottom-width:1px;
  padding:10px 0;
  font-size:18px;
  margin-bottom:30px;
`
export const ButtonWrap = styled.View`
  width: 100%;
  height: 100px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const Button = styled.TouchableOpacity`
  width: 100%;
  height: 45px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #1e90ff;
`;
export const ButtonText = styled.Text`
  font-size: 17px;
  color: white;
`;
export const Subtitle = styled(ThemedText)`
  font-size: 16px;
  font-weight: 400;
  margin-bottom:10px;
`;
export const GenderWrap = styled.View`
  width:100%;
  height:70px;
  display:flex;
  justify-content:space-between;
  align-items:center;
  flex-direction:row;
  margin-bottom:30px;
`
export const GenderBox = styled.TouchableOpacity<{ isSelected: boolean }>`
  width: 31%;
  height: 100%;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-width:${(props) => (props.isSelected ? "2px" : "0px")};
  border-color:#1E90FF;
`;
export const GenderText = styled.Text`
  font-size:12px;
  margin-top:5px;
`
export const BirthdayWrap = styled(ThemedBox)`
  width:100%;
  height:50px;
  display:flex;
  align-items:center;
  flex-direction:row;
  justify-content:center;
  border-radius:10px;
  padding:0 20px;
`
export const BirthdayText = styled(ThemedText)`
  font-size:20px;
  font-weight:500;
`