import styled from "@emotion/native";
import { ThemedBox, ThemedText, ThemedView } from "../../theme";

export const Container = styled(ThemedView)`
  width: 100%;
  flex: 1;
  align-items: center;
`;

export const Main = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  padding: 0 10px;
`;
export const SearchWrap = styled.View`
  width: 100%;
  height: 50px;
  border-bottom-width: 1px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 10px;
  box-sizing: border-box;
`;
export const Input = styled.TextInput`
  flex: 1;
  font-size: 17px;
`;

export const SearchResultWrap = styled(ThemedBox)`
  width:90%;
  padding:20px;
  border-radius:10px;
  display:flex;
  align-items:center;
  justify-content:center;
  margin-top:30px;
`
export const ProfileImg = styled.Image`
  width:80px;
  height:80px;
  border-radius:5px;
  object-fit:cover;
  object-position:center;
`
export const Nickname = styled(ThemedText)`
  font-size:20px;
  margin: 10px 0;
`

export const AddBtn = styled.TouchableOpacity`
  background-color: #1e90ff;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40px;
  border-radius: 5px;
`;

export const ButtonText = styled.Text`
  font-size:15px;
  color:white;
`