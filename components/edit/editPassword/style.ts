import styled from "@emotion/native";

export const Container = styled.View`
  width:100%;
  min-height:60px;
  max-height:120px;
`
export const InputWrap = styled.View`
  width:100%;
  height:60px;
  display:flex;
  flex-direction:row;
  justify-content:space-between;
  align-items:flex-end;
  padding-bottom:10px;
`
export const Input = styled.TextInput<{ color: string }>`
  width: 80%;
  height: 50px;
  box-sizing: border-box;
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.color};
  font-size: 18px;
  color: ${(props) => props.color};
`;
export const Button = styled.TouchableOpacity<{ isDisabled: boolean }>`
  background-color: ${(props) => (props.isDisabled ? "#135ba1" : "#1e90ff")};
  width: 17%;
  height: 80%;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const ButtonText = styled.Text<{ isDisabled: boolean }>`
  color: ${(props) => (props.isDisabled ? "#ccc" : "white")};
`;