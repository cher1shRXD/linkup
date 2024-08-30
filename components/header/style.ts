import styled from "@emotion/native";
import { ThemedText, ThemedView } from "../theme";

export const Container = styled(ThemedView)`
  width:100%;
  height:50px;
  display:flex;
  align-items:flex-start;
  justify-content:center;
  padding: 0 15px;
  box-sizing:border-box;
  margin-top:50px;
`
export const HeaderText = styled(ThemedText)`
  font-size:27px;
  font-weight:700;
`