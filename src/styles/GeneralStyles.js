import styled from "styled-components/native";
import { Platform } from "react-native";

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 5px;
  background-color: #008b8b;
`;

export const ScrollContainer = styled.ScrollView`
  flex: 1;
  padding: 5px;
  background-color: #008b8b;
`;

export const Button = styled.TouchableOpacity`
  align-self: stretch;
  border-radius: 10px;
  background-color: ${(props) => (props.color ? props.color : "#7FFFD4")};
  border-width: 1px;
  padding: ${(props) => (props.pad ? props.pad : "5px")};
  margin: 5px;
`;

export const SeparatedButton = styled(Button)`
  margin-horizontal: 10px;
  border-color: #000000;
  background-color: ${(props) => (props.color ? props.color : "#00ffff")};
  flex: 1;
`;

export const ButtonText = styled.Text`
  text-align: center;
  color: ${(props) => (props.color ? props.color : "#483d8b")};
  font-size: ${(props) => (props.size ? props.size : "14px")};
`;

export const SearchInput = styled.TextInput`
  border-color: #000000;
  border-width: 1px;
  margin: 5px;
  background-color: #ffffff;
  color: #000000;
  border-radius: 10px;
  padding: 2px;
`;

export const SeparatedSearchInput = styled(SearchInput)`
  flex: 3;
`;

export const SearchButton = styled.TouchableOpacity`
  border-radius: 10px;
  padding: 5px;
  margin: 5px;
  flex: 1;
  background-color: #483d8b;
`;

export const BoldText = styled.Text`
  font-family: ${Platform.OS === "ios" ? "Gill Sans" : "serif"};
  font-weight: bold;
  font-size: ${(props) => (props.size ? props.size : "30px")};
  text-decoration-line: ${(props) => (props.underline ? "underline" : "none")};
`;

export const CenteredBoldText = styled(BoldText)`
  text-align: center;
`;

export const RoundedImage = styled.Image`
  height: 150px;
  width: 150px;
  border-radius: 75px;
  border-width: 1px;
  background-color: #ffffff;
  border-color: #000000;
  margin-bottom: 10px;
`;

export const ButtonGroup = styled.View`
  padding-bottom: 10px;
  border-bottom-width: 1px;
  flex-direction: row;
`;
