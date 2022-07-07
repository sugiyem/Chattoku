import { Dimensions, Platform, StyleSheet, Text, View } from "react-native";
import React from "react";
import BlockIcon from "../Chat/BlockIcon";
import EditFriendIcon from "../Chat/EditFriendIcon";
import { userFoundType } from "../../constants/UserFound";
import styled from "styled-components/native";

const RenderUserFound = ({ type, userData }) => {
  if (userData === null) {
    return <Text>There is no user with such username</Text>;
  }

  const userId = userData.id;
  const isToBefriend = type === userFoundType.TO_BEFRIEND;

  const ButtonGroups = () => (
    <ButtonContainer>
      {isToBefriend && <EditFriendIcon userId={userId} />}
      <BlockIcon userId={userId} />
    </ButtonContainer>
  );

  return (
    <UserContainer>
      <TopContainer>
        <Name>{userData.username}</Name>
        <Bio>{userData.bio}</Bio>
      </TopContainer>
      <BottomContainer>
        <ProfileImage
          source={
            userData.img !== ""
              ? { uri: userData.img }
              : require("../../assets/default-profile.png")
          }
        />
        <ButtonGroups />
      </BottomContainer>
    </UserContainer>
  );
};

export default React.memo(RenderUserFound);

const width = Dimensions.get("screen").width;

const UserContainer = styled.View`
  border-radius: 10px;
  border-color: darkslateblue;
  border-width: 1px;
  width: ${width - 20}px;
  background-color: cyan;
  flex-direction: column;
`;

const TopContainer = styled.View`
  width: 100%;
  height: 100px;
  justify-content: center;
  border-bottom-width: 1px;
  border-bottom-color: black;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  padding-left: 100px;
  background-color: lightblue;
`;
const Name = styled.Text`
  font-family: ${Platform.OS === "ios" ? "Gill Sans" : "serif"};
  font-weight: bold;
  font-size: 25px;
  color: navy;
`;

const Bio = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: darkslateblue;
`;

const ProfileImage = styled.Image`
  position: absolute;
  height: 80px;
  width: 80px;
  border-radius: 80px;
  border-width: 1px;
  border-color: white;
  top: -40px;
  left: 10px;
`;

const BottomContainer = styled.View`
  width: 100%;
  height: 100px;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  margin-left: 100px;
  margin-top: 10px;
  justify-content: center;
`;
