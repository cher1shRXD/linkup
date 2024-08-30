import styled from "@emotion/native";
import { ThemedView } from "../theme";

export const Container = styled(ThemedView)`
  width:100%;
  height:80px;
  display:flex;
  flex-direction:row;
  justify-content:center;
  align-items:center;
  box-sizing:border-box;
  padding: 0 10px 30px 10px;
`
export const TabItem = styled.TouchableOpacity`
  width:25%;
  height:100%;
  display:flex;
  align-items:center;
  justify-content:space-evenly;
`