import styled from "@emotion/native";
import { ThemedText, ThemedView } from "../../../../theme";

export const Container = styled(ThemedView)`
  width: 100%;
  flex: 1;
  align-items: center;
`;

export const Banner = styled.View`
  width:100%;
  flex:1;
  background-color:#ccc;
  justify-content:flex-end;
  align-items:center;
  padding: 20px;
  box-sizing:border-box;
`

export const ProfilePicture = styled.View`
  width:40%;
  aspect-ratio:1/1;
  background-color:green;
  border-radius:30px;
`

export const InfoWrap = styled.View`
  width:100%;
  height:180px;
  display:flex;
  align-items:center;
  padding: 15px;
  box-sizing:border-box;
`
export const GoChat = styled.TouchableOpacity`
  width:80px;
  height:80px;
  display:flex;
  justify-content:space-evenly;
  align-items:center;
`

export const Name = styled(ThemedText)`
  font-size:22px;
  font-weight:500;
  margin-bottom:5px;
`

export const Status = styled(ThemedText)`
  font-size:15px;
  font-weight:200;
  margin-bottom:20px;
`