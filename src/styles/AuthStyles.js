import styled from "styled-components/native";

export const AuthContainer = styled.SafeAreaView`
  flex: 1;
  padding: 5px;
  row-gap: 15px;
  justify-content: center;
  align-items: center;
  background-color: #008b8b;
`;

export const AuthSystemContainer = styled.View`
  margin: 10px;
  background-color: #00ffff;
  border-width: 1px;
  border-radius: 5px;
  padding: 5px;
  align-self: stretch;
`;

export const AuthTextInput = styled.TextInput`
  border-radius: 10px;
  border-width: 1px;
  align-self: stretch;
  background-color: #ffffff;
  padding: 5px;
  margin-vertical: 10px;
`;

export const AuthTitle = styled.Text`
  text-align: center;
  font-weight: 600;
  font-size: 25px;
  color: #483d8b;
`;
