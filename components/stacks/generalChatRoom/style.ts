import styled from "@emotion/native";
import { ThemedBox, ThemedView } from "../../theme";

export const Container = styled(ThemedView)`
  width: 100%;
  flex: 1;
  align-items: center;
  padding-bottom:20px;
`;
export const ChatWrap = styled.ScrollView`
  width: 100%;
  flex: 1;
  padding:15px;
  box-sizing:border-box;
  padding-bottom:50px;
`;
export const TextInputWrap = styled.View<{color:string}>`
  width: 100%;
  height: 70px;
  border-top-width: 1px;
  border-top-color: ${props=>props.color};
  display:flex;
  flex-direction:row;
  padding: 10px;
`;

export const Input = styled.TextInput`
  flex: 1;
  padding: 10px;
  border-radius: 10px;
  max-height: 100px;
`;

export const SendButton = styled.TouchableOpacity`
  width:50px;
  padding: 10px;
`;

export const ChatBoxArea = styled.View`
  width:100%;
  display:flex;
  flex-direction:row;
`
export const Profile = styled.Image`
  width:40px;
  height:40px;
  border-radius:5px;
  object-fit:cover;
  object-position:center;
`
export const FillerProfile = styled.View`
  width:40px;
  height:40px;
`

export const OtherChat = styled(ThemedBox)`
  justify-self:flex-start;
  padding:10px 15px;
  border-radius:10px;
  margin: 3px 10px;
  max-width:80%;
`

export const MyChat = styled(ThemedBox)`
  justify-self:flex-end;
  padding: 10px 15px;
  border-radius: 10px;
  margin: 3px 10px;
  max-width: 80%;
`;