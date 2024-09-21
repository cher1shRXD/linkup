import styled from "@emotion/native";
import { ThemedBox, ThemedText, ThemedView } from "../../theme";

export const Container = styled(ThemedView)`
  width: 100%;
  flex: 1;
  align-items: center;
`;

export const FriendsWrap = styled(ThemedBox)`
  width: 100%;
  border-radius: 10px;
  margin-bottom: 15px;
`;
export const FriendBox = styled.TouchableOpacity<{
  border: string;
  isLast: boolean;
  bg: string;
}>`
  width: 100%;
  height: 70px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 8px;
  border-bottom-width: ${(props) => (props.isLast ? "0px" : "1px")};
  border-bottom-color: ${(props) => props.border};
  background-color: ${(props) => props.bg};
`;
export const FriendPicture = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 5px;
  object-fit: cover;
  object-position: center;
  background-color: #ccc;
`;
export const FriendName = styled(ThemedText)`
  font-size: 16px;
  font-weight: 500;
`;
export const HiddenItemWrap = styled.View`
  width: 70px;
  height: 70px;
  align-self: flex-end;
`;