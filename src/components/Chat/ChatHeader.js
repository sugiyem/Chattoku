import { Dimensions, Platform } from "react-native";
import React from "react";
import { chatType } from "../../constants/Chat";
import styled from "styled-components/native";
import { Icon } from "react-native-elements";
import EditFriendIcon from "./EditFriendIcon";
import BlockIcon from "./BlockIcon";
import { leaveGroup } from "../../services/Friend/HandleGroup";
import Caution from "../Miscellaneous/Caution";
import { IconContainer, IconDescription } from "../../styles/ChatStyles";

const ChatHeader = ({ type, item, navigation }) => {
  const isPrivateChat = type === chatType.PRIVATE_CHAT;
  const contactID = item.id;
  const name = isPrivateChat ? item.username : item.name;
  const info = isPrivateChat ? item.bio : item.description;
  const imgUrl = item.img;

  function goToGroupPage() {
    navigation.navigate("Friends", {
      screen: "GroupInfo",
      initial: false,
      params: { groupData: item }
    });
  }

  function onLeaveGroup() {
    Caution("You will leave this group.", () =>
      leaveGroup(contactID).then(() => navigation.replace("GroupChatList"))
    );
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

      <SectionContainer size="2">
        <Name>{name}</Name>
        <Info>{info}</Info>
      </SectionContainer>

      <RowSectionContainer>
        {isPrivateChat ? (
          <>
            <EditFriendIcon userId={item.id} isSmall={true} />
            <BlockIcon userId={item.id} isSmall={true} />
          </>
        ) : (
          <>
            <IconContainer isSmall={true}>
              <Icon
                type="ionicon"
                name="open-outline"
                size={25}
                color="navy"
                onPress={goToGroupPage}
              />
              <IconDescription color="navy" isSmall={true}>
                Group Info
              </IconDescription>
            </IconContainer>

            <IconContainer isSmall={true}>
              <Icon
                type="ionicon"
                name="exit-outline"
                size={25}
                color="#c10015"
                onPress={onLeaveGroup}
              />
              <IconDescription color="#c10015" isSmall={true}>
                Leave
              </IconDescription>
            </IconContainer>
          </>
        )}
      </RowSectionContainer>
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

const RowSectionContainer = styled.View`
  flex: 3;
  flex-direction: row;
  justify-content: center;
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
