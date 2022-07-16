import styled from "styled-components/native";

export const ForumSearchBar = styled.TextInput`
  flex-grow: 0;
  flex-shrink: 0;
  align-self: stretch;
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

export const ForumHomeTitle = styled.Text`
  color: whitesmoke;
  font-size: 25px;
  font-weight: bold;
  font-family: ${Platform.OS === "ios" ? "Gill Sans" : "serif"};
  text-align: center;
  margin: 10px;
  text-decoration-line: underline;
`;

export const CreateForumButton = styled.TouchableOpacity`
  margin-top: 5px;
  align-self: stretch;
  border-radius: 10px;
  border-width: 1px;
  border-color: navy;
  background-color: #44d0fe;
  padding: 7px;
`;

export const CreateForumText = styled.Text`
  font-size: 18px;
  font-weight: 500;
  align-self: center;
  text-align: center;
  color: navy;
`;

export const AquaButton = styled.TouchableOpacity`
  align-self: stretch;
  padding: 5px;
  margin: 5px;
  border-radius: 10px;
  border-width: 1px;
  background-color: aquamarine;
  align-items: center;
`;

export const AquaButtonText = styled.Text`
  color: navy;
`;

export const DarkButton = styled.TouchableOpacity`
  align-self: stretch;
  padding: 10px;
  border-radius: 20px;
  margin: 5px;
  background-color: darkblue;
`;

export const DarkButtonText = styled.Text`
  align-self: center;
  font-size: 16px;
  font-weight: 400;
  color: white;
`;
