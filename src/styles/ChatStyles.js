import styled from "styled-components/native";

export const ChatContainer = styled.View`
  flex: 1;
  background-color: darkcyan;
  padding: 5px;
`;

export const ScrollChatContainer = styled.ScrollView`
  flex: 1;
  background-color: darkcyan;
  padding: 5px;
`;

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
