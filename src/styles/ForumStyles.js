import { LinearGradient } from "expo-linear-gradient";
import { ScrollView } from "react-native";
import styled from "styled-components/native";

export const ScrollContainer = ({ children }) => {
  return (
    <LinearGradient
      colors={["#87ceeb", "#4d4dff"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1, alignItems: "stretch" }}
    >
      <ScrollView>{children}</ScrollView>
    </LinearGradient>
  );
};

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
  border-width: 1px;
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

export const RoundDarkButton = styled.TouchableOpacity`
  align-self: stretch;
  padding: 10px;
  border-radius: 20px;
  margin: 5px;
  background-color: darkblue;
`;

export const DarkButton = styled.TouchableOpacity`
  align-self: stretch;
  border-radius: 10px;
  padding: 15px;
  background-color: navy;
  margin: 20px;
  border-width: 1px;
  border-color: #44d0fe;
`;

export const DarkButtonText = styled.Text`
  justify-content: center;
  align-self: center;
  font-size: 16px;
  font-weight: bold;
  color: white;
`;

export const BannedText = styled.Text`
  border-radius: 10px;
  padding: 10px 30px;
  background-color: navy;
  margin: 10px;
  color: whitesmoke;
  font-size: 18px;
  font-weight: 500;
  text-align: center;
  border-width: 0.5px;
  border-color: whitesmoke;
`;
