import styled from "@emotion/native";
import { ThemedText, ThemedView } from "../../theme";

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
  font-size:17px;
  color:white;
`