import styled from "@emotion/native";
import { ThemedBox, ThemedView } from "../../theme";

export const Container = styled(ThemedView)`
  width: 100%;
  flex: 1;
  align-items: center;
  justify-content: center;
`;
export const ChatWrap = styled.ScrollView`
  width: 100%;
  flex: 1;
`;
export const TextInputWrap = styled.View`
  width: 100%;
  height: 60px;
  flex-direction: row;
`;
export const Enter = styled.TouchableOpacity`
  width: 90%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
`;
