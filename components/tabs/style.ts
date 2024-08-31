import styled from "@emotion/native";
import { ThemedView } from "../theme";

export const Container = styled(ThemedView)`
  width:100%;
  height:90px;
  display:flex;
  flex-direction:row;
  justify-content:center;
  align-items:center;
  box-sizing:border-box;
  padding: 10px 10px 25px 10px;
`
export const TabItem = styled.TouchableOpacity`
  width:25%;
  height:100%;
  display:flex;
  align-items:center;
  justify-content:space-evenly;
`