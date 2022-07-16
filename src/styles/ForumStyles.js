import styled from "styled-components/native";

export const ForumSearchBar = styled.TextInput`
  flex-grow: 0;
  flex-shrink: 0;
  border-color: black;
  border-width: 1px;
  margin: 10px;
  background-color: whitesmoke;
  color: black;
  padding: 5px;
  border-radius: 10px;
`;

export const ForumNavigation = styled.TouchableOpacity`
  align-self: stretch;
  padding: 10px;
  border-width: 0.7px;
  border-color: navy;
  background-color: aquamarine;
`;

export const NavigationText = styled.Text`
  text-align: center;
  color: blue;
  font-size: 15px;
`;
