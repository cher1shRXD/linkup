import styled from "@emotion/native";
import { ThemedText, ThemedView } from "../theme";

export const Container = styled(ThemedView)`
  width:100%;
  flex:1;
  align-items:center;
`

export const NotiWrap = styled.View`
  width:100%;
  height:100px;
  flex-direction:row;
  display:flex;
  align-items:center;
  padding:0 10px;
  box-sizing:border-box;
`
export const NotiBox = styled.View`
  width:180px;
  height:100px;
  margin-left:20px;
`
export const NotiInfoWrap = styled.View`
  width: 180px;
  height:50px;
  display:flex;
  justify-content:center;
`
export const NotiAcceptWrap = styled.View`
  width:180px;
  height:50px;
  display:flex;
  flex-direction:row;
`

export const AcceptBtn = styled.TouchableOpacity`
  width: 35px;
  height: 35px;
  border-radius:5px;
  margin-left:5px;
  display:flex;
  align-items:center;
  justify-content:center;
`

export const ProfileImg = styled.Image`
  width:80px;
  height:80px;
  border-radius:5px;
  object-fit:cover;
  object-position:center;
`

export const ReqText = styled(ThemedText)`
  font-size:13px;
  font-weight:200;
`
export const NoReq = styled.View`
  width:100%;
  height:100px;
  display:flex;
  justify-content:center;
  align-items:center;
`