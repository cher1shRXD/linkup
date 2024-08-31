import styled from "@emotion/native";
import { ThemedText, ThemedView } from "../../theme";

export const Container = styled(ThemedView)`
  width: 100%;
  flex: 1;
`;
export const Main = styled.View`
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
`;
export const SectionTitle = styled(ThemedText)`
  font-size: 17px;
  font-weight: 200;
  margin-bottom: 10px;
`;
export const SectionSubTitle = styled(ThemedText)`
  font-size:13px;
  font-weight:200;
  margin-bottom:10px;
`
export const SeperLine = styled.View<{color:string}>`
  width:100%;
  height:1px;
  background-color:${props=>props.color};
  margin:10px 0;
`