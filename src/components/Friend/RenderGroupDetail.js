import React from "react";
import { View } from "react-native";
import {
  Button,
  ButtonText,
  RoundedImage,
  ScrollContainer
} from "../../styles/GeneralStyles";
import {
  Description,
  Name,
  ListContainer,
  ProfileContainer
} from "../../styles/InfoStyles";
import { groupMemberType } from "../../constants/Group";
import GroupAdminButtons from "./GroupAdminButtons";
import GroupMemberList from "./GroupMemberList";

const RenderGroupDetail = ({
  type,
  groupInfo,
  members = [],
  pendingMembers = [],
  navigation
}) => {
  const isAdmin =
    type === groupMemberType.OWNER || type === groupMemberType.ADMIN;
  const isMember = isAdmin || type === groupMemberType.MEMBER;

  const sectionDetails = [
    {
      data: members,
      title: "Members"
    }
  ];

  if (isMember) {
    sectionDetails.push({
      data: pendingMembers,
      title: "Pending Members"
    });
  }

  const GroupMemberLists = () =>
    sectionDetails.map((item, index) => (
      <GroupMemberList key={index} title={item.title} items={item.data} />
    ));

  const imageSource =
    groupInfo.img !== ""
      ? { uri: groupInfo.img }
      : require("../../assets/default-profile.png");

  return (
    <ScrollContainer>
      <Button onPress={() => navigation.replace("GroupList")} testID="backButton">
        <ButtonText>Go Back</ButtonText>
      </Button>

      <ProfileContainer>
        <RoundedImage source={imageSource} testID="image" />
        <Name testID="name">{groupInfo.name}</Name>
        <Description testID="description">{groupInfo.description}</Description>
        {isAdmin && (
          <View testID="adminButtons">
            <GroupAdminButtons
              type={type}
              groupInfo={groupInfo}
              navigation={navigation}
            />
          </View>
        )}
      </ProfileContainer>

      <ListContainer>
        <GroupMemberLists />
      </ListContainer>
    </ScrollContainer>
  );
};

export default RenderGroupDetail;
