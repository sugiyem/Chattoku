import styled from "styled-components/native";
import { ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export const ChatContainer = ({ children }) => {
  return (
    <LinearGradient
      colors={["#87ceeb", "#4d4dff"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1, padding: 5 }}
    >
      {children}
    </LinearGradient>
  );
};

export const ScrollChatContainer = ({ children }) => {
  return (
    <LinearGradient
      colors={["#87ceeb", "#4d4dff"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1, padding: 5 }}
    >
      <ScrollView>{children}</ScrollView>
    </LinearGradient>
  );
};

export const ChatListContainer = styled.View`
  flex: 1;
  align-self: stretch;
  margin: 10px;
  padding: 5px;
`;

export const IconContainer = styled.View`
  margin-horizontal: ${(props) => (props.isSmall ? "5" : "20")}px;
`;

export const IconDescription = styled.Text`
  text-align: center;
  font-size: ${(props) => (props.isSmall ? "10" : "12")}px;
  color: ${(props) => (props.color ? props.color : "white")};
`;
