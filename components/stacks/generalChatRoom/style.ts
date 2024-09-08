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

export const OtherChatBoxArea = styled.View`
  width:100%;
  display:flex;
  flex-direction:row;
`
export const OtherProfile = styled.Image`
  width:50px;
  height:50px;
  border-radius:20px;
  object-fit:cover;
  object-position:center;
`

export const OtherChat = styled(ThemedBox)`
  align-self:flex-start;
  padding:10px 15px;
  border-radius:10px 10px 10px 0;
  margin: 5px;
`