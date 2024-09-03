import styled from "@emotion/native";
import { ThemedText, ThemedView } from "../theme";

export const Container = styled(ThemedView)`
  width:100%;
  height:50px;
  display:flex;
  flex-direction:row;
  align-items:center;
  padding: 0 15px;
  box-sizing:border-box;
  margin-top:50px;
`
export const Filler = styled.View`
  flex:1;
`
export const HeaderText = styled(ThemedText)`
  font-size:27px;
  font-weight:700;
`
export const LogoImg = styled.Image`
  width:25px;
  height:25px;
  margin-right:5px;
`