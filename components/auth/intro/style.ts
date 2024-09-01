import styled from "@emotion/native";
import { ThemedText, ThemedView } from "../../theme";

export const Container = styled(ThemedView)`
  width:100%;
  flex:1;
  align-items:center;
  padding: 70px 0 40px 0%;
`
export const Title = styled(ThemedText)`
  font-size:25px;
  font-weight:700;
`
export const ButtonWrap = styled.View`
  width:100%;
  height:100px;
  padding:0 20px;
  box-sizing:border-box;
  display:flex;
  justify-content:space-between;
  align-items:center;
`
export const Button = styled.TouchableOpacity`
  width: 100%;
  height: 45px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const ButtonText = styled.Text`
  font-size:17px;
`
export const Filler = styled.View`
  flex:1;
`
export const LogoImg = styled.Image`
  width:170px;
  height:140px;
  object-fit:contain;
  object-position:center;
  margin-top:100px;
`
export const SubTitle = styled(ThemedText)`
  font-size:15px;
  font-weight:200;
`