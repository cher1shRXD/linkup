import styled from "@emotion/native";

export const Container = styled.View`
  width: 100%;
  height: 130px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const Input = styled.TextInput<{ border: string; text: string }>`
  width: 100%;
  height: 75px;
  border: 1px ${(props) => props.border} solid;
  padding: 10px;
  color: ${(props) => props.text};
  text-align: start;
  border-radius:10px;
`;
export const Button = styled.TouchableOpacity<{isDisabled:boolean}>`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background-color: ${(props) => (props.isDisabled ? "#135ba1" : "#1e90ff")};
`;
export const ButtonText = styled.Text<{ isDisabled: boolean }>`
  font-size: 15px;
  color: ${(props) => (props.isDisabled ? "#ccc" : "white")};
`;