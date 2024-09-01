import styled from "@emotion/native";

export const Container = styled.View`
  width:100%;
  height:100px;
  display:flex;
  flex-direction:row;
  justify-content:center;
  margin-top: 10px;
`;
export const ProfileImg = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 10px;
  object-fit: cover;
  object-position: center;
  background-color: #e0e0e0;
`;
export const ProfileImgBtnWrap = styled.View`
  width: 120px;
  height: 100%;
  display: flex;
  justify-content: space-around;
  padding: 0 10px;
  box-sizing: border-box;
`;
export const ProfileImgBtn = styled.TouchableOpacity`
  width: 120px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
`;

export const ProgressWrap = styled.View`
  width:100%;
  height:5px;
  border-radius:50px;
  margin-top:10px;
  margin-bottom:15px;
`