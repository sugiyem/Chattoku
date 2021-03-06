import React from "react";
import { Modal, Platform, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";
import styled from "styled-components/native";
import EditFriendIcon from "./EditFriendIcon";
import BlockIcon from "./BlockIcon";
import { IconContainer, IconDescription } from "../../styles/ChatStyles";

const ChatModal = ({
  item,
  isVisible,
  onCloseButtonPress,
  onMessageButtonPress
}) => {
  const imgSource =
    item.img !== ""
      ? { uri: item.img }
      : require("../../assets/default-profile.png");
  const isUserDeleted = item.username === "Deleted-Account";

  return (
    <Modal
      animationType="fade"
      visible={isVisible}
      onRequestClose={onCloseButtonPress}
    >
      <ModalContainer>
        <ModalHeader>
          <Icon
            containerStyle={styles.exitIcon}
            name="close"
            onPress={onCloseButtonPress}
            color="white"
            size={30}
            testID="closeIcon"
          />
        </ModalHeader>
        <ModalContent>
          <ProfilePicture testID="image" source={imgSource} />
          <Name testID="username">{item.username}</Name>
          <Bio testID="bio">{item.bio}</Bio>
          {!isUserDeleted && (
            <IconGroup>
              <IconContainer>
                <Icon
                  type="material-community"
                  name="message-processing-outline"
                  color="aquamarine"
                  onPress={onMessageButtonPress}
                  testID="messageIcon"
                  size={40}
                />
                <IconDescription color="aquamarine">Message</IconDescription>
              </IconContainer>
              <EditFriendIcon userId={item.id} />
              <BlockIcon userId={item.id} />
            </IconGroup>
          )}
        </ModalContent>
      </ModalContainer>
    </Modal>
  );
};

export default ChatModal;

const styles = StyleSheet.create({
  exitIcon: {
    marginLeft: 10,
    marginTop: 10
  }
});

const ModalContainer = styled.View`
  flex: 1;
  background-color: darkslateblue;
`;

const ModalHeader = styled.View`
  flex-direction: row;
`;

const ModalContent = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 10px;
  margin: 20px;
`;

const ProfilePicture = styled.Image`
  height: 150px;
  width: 150px;
  border-radius: 75px;
  border-width: 1px;
  border-color: blue;
`;

const Name = styled.Text`
  font-family: ${Platform.OS === "ios" ? "Gill Sans" : "serif"};
  font-size: 25px;
  font-weight: bold;
  text-align: center;
  margin-vertical: 10px;
  color: white;
`;

const Bio = styled.Text`
  font-size: 15px;
  font-weight: 600;
  text-align: center;
  margin-vertical: 10px;
  color: lightblue;
`;

const IconGroup = styled.View`
  flex-direction: row;
  margin-top: 40px;
`;
