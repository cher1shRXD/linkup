import styled from "@emotion/native";
import { ThemedView } from "../../theme";

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
