import styled from "@emotion/native";
import { ThemedView } from "../../theme";

export const Container = styled(ThemedView)`
  width: 100%;
  flex: 1;
  align-items: center;
`;
export const MenuWrap = styled.View<{ border: string }>`
  width: 100%;
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.border};
  border-top-width:1px;
  border-top-color:${props=>props.border};
`;

export const MenuBox = styled.TouchableOpacity<{ border: string, isLast:boolean }>`
  width: 100%;
  height: 50px;
  padding: 0 10px;
  box-sizing: border-box;
  border-bottom-width:${props=>props.isLast ? "0px" : "1px"};
  border-bottom-color: ${(props) => props.border};
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;