import { Dimensions, Platform } from "react-native";
import React from "react";
import { chatType } from "../../constants/Chat";
import styled from "styled-components/native";
import { Icon } from "react-native-elements";

const ChatHeader = ({ type, item, navigation }) => {
  const isPrivateChat = type === chatType.PRIVATE_CHAT;
  const name = isPrivateChat ? item.username : item.name;
  const info = isPrivateChat ? item.bio : item.description;
  const imgUrl = item.img;

  function goToGroupPage() {
    navigation.navigate("Friends", {
      screen: "GroupInfo",
      params: { groupData: item }
    });
  }

  return (
    <HeaderContainer>
      <SectionContainer size="1">
        <Icon type="ionicon" name="arrow-back" onPress={navigation.goBack} />
      </SectionContainer>

      <SectionContainer size="2">
        <ProfilePicture
          source={
            imgUrl !== ""
              ? { uri: imgUrl }
              : require("../../assets/default-profile.png")
          }
        />
      </SectionContainer>

      <SectionContainer size="3">
        <Name>{name}</Name>
        <Info>{info}</Info>
      </SectionContainer>

      <SectionContainer size="3">
        {isPrivateChat ? (
          <HeaderButton>
            <HeaderButtonText>Block User</HeaderButtonText>
          </HeaderButton>
        ) : (
          <HeaderButton onPress={goToGroupPage}>
            <HeaderButtonText>Group Info</HeaderButtonText>
          </HeaderButton>
        )}
      </SectionContainer>
    </HeaderContainer>
  );
};

export default ChatHeader;

const width = Dimensions.get("screen").width;

const HeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
  width: ${width - 10}px;
  background-color: cyan;
  border-color: blue;
  border-width: 1px;
  border-radius: 10px;
  margin-bottom: 10px;
  padding-vertical: 10px;
`;

const SectionContainer = styled.View`
  flex: ${(props) => props.size};
`;

const ProfilePicture = styled.Image`
  height: 80px;
  width: 80px;
  border-radius: 80px;
  border-width: 1px;
  border-color: black;
`;

const Name = styled.Text`
  font-size: 18px;
  font-weight: 600;
  font-family: ${Platform.OS === "ios" ? "Gill Sans" : "serif"};
`;

const Info = styled.Text`
  font-size: 14px;
`;

const HeaderButton = styled.TouchableOpacity`
  align-self: stretch;
  padding: 5px;
  padding-horizontal: 10px;
  margin: 5px;
  margin-right: 10px;
  border-radius: 20px;
  border-width: 1px;
  background-color: white;
  justify-self: flex-end;
`;

const HeaderButtonText = styled.Text`
  text-align: center;
  font-size: 12px;
  color: darkslateblue;
`;
