import styled from "styled-components/native";
import { Platform } from "react-native";

export const ProfileContainer = styled.View`
  align-items: center;
  justify-content: center;
  margin-top: 10px;
`;

export const ListContainer = styled.View`
  align-self: stretch;
  border-top-width: 1px;
  border-top-color: #000000;
  margin: 10px;
  padding: 5px;
`;

export const Name = styled.Text`
  font-family: ${Platform.OS === "ios" ? "Gill Sans" : "serif"};
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  margin-vertical: 10px;
  color: ${(props) => (props.color ? props.color : "#000000")};
`;

export const Description = styled.Text`
  font-size: 15px;
  font-weight: 600;
  color: #7fffd4;
  text-align: center;
  margin-bottom: 10px;
`;

export const EditButtonGroup = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: stretch;
  margin-bottom: 10px;
`;

export const EditButton = styled.TouchableOpacity`
  border-color: #000080;
  border-width: 2px;
  border-radius: 3px;
  background-color: #ffffff;
  padding-vertical: 8px;
  padding-horizontal: 12px;
  margin-horizontal: 5px;
`;

export const EditButtonText = styled.Text`
  color: #2e64e5;
  font-size: 13px;
  text-align: center;
`;

export const ListTitleText = styled.Text`
  font-family: ${Platform.OS === "ios" ? "Gill Sans" : "serif"};
  font-size: 20px;
  font-weight: 600;
  text-decoration-line: underline;
`;
