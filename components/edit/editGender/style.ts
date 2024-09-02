import styled from "@emotion/native";

export const Container = styled.View`
  width:100%;
  height:120px;
  display:flex;
  align-items:center;
  justify-content:space-between;
`
export const GenderWrap = styled.View`
  width: 100%;
  height: 70px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
export const GenderBox = styled.TouchableOpacity<{ isSelected: boolean }>`
  width: 31%;
  height: 100%;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-width: ${(props) => (props.isSelected ? "2px" : "0px")};
  border-color: #1e90ff;
`;
export const GenderText = styled.Text`
  font-size: 12px;
  margin-top: 5px;
`;
export const Button = styled.TouchableOpacity<{ isDisabled: boolean }>`
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