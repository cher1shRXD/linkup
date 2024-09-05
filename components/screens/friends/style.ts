import styled from "@emotion/native";
import { ThemedBox, ThemedText, ThemedView } from "../../theme";

export const Container = styled(ThemedView)`
  width: 100%;
  flex: 1;
  align-items: center;
`;
export const SectionTitle = styled(ThemedText)`
  font-size:17px;
  font-weight:200;
  margin-bottom:10px;
`
export const MyInfoWrap = styled(ThemedBox)`
  width:100%;
  height:90px;
  border-radius:10px;
  padding:10px;
  box-sizing:border-box;
  display:flex;
  align-items:center;
  flex-direction:row;
  margin-bottom: 30px;
`
export const MyProfilePicture = styled.Image`
  width: 70px;
  height: 70px;
  border-radius: 5px;
  object-fit: cover;
  object-position: center;
  background-color: #e0e0e0;
`;
export const MyInfo = styled.View`
  flex:1;
  height:100%;
  padding: 10px;
`
export const MyName = styled(ThemedText)`
  font-size:20px;
  font-weight:500;
`
export const MyStatus = styled(ThemedText)`
  font-size:12px;
  font-weight:200;
  margin-top:5px;
  word-break:keep-all;
`
export const FriendsWrap = styled(ThemedBox)`
  width:100%;
  border-radius:10px;
  margin-bottom:15px;
`
export const FriendBox = styled.TouchableOpacity<{border:string,isLast:boolean,bg:string}>`
  width: 100%;
  height: 70px;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  flex-direction: row;
  border-bottom-width:${props=>props.isLast ? "0px" : "1px"};
  border-bottom-color:${props=>props.border};
  background-color:${props=>props.bg};
`;
export const FriendInfo = styled.View`
  flex: 1;
  height: 100%;
  padding: 7px;
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
  font-size:16px;
  font-weight:500;
`
export const FriendStatus = styled(ThemedText)`
  font-size:10px;
  font-weight:200;
  margin-top:5px;
`
export const AddFriend = styled(ThemedBox)`
  width:80px;
  height: 30px;
  border-radius:10px;
  display:flex;
  justify-content:center;
  align-items:center;
  align-self:center;
  margin-bottom:30px;
  margin-top:15px;
`
export const HiddenItemWrap = styled.View`
  width:70px;
  height:70px;
  align-self:flex-end;
`