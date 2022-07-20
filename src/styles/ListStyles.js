import styled from "styled-components/native";

export const itemContainerStyle = {
  marginVertical: 5,
  borderRadius: 10,
  borderWidth: 1,
  borderBottomWidth: 1,
  borderColor: "#011F5B",
  backgroundColor: "#87CEFA"
};

export const ActionBar = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
  background-color: #0076ce;
  border-radius: 10px;
  border-width: 1px;
  border-color: #1f305e;
  margin: 10px;
  padding: 10px;
`;

export const ActionBarText = styled.Text`
  text-align: center;
  color: #f0f8ff;
`;
