import React from "react";
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

  return (
    <ScrollContainer>
      <Button onPress={() => navigation.replace("GroupList")}>
        <ButtonText color="#000000">Go Back</ButtonText>
      </Button>

      <ProfileContainer>
        {groupInfo.img.length > 0 ? (
          <RoundedImage source={{ uri: groupInfo.img }} />
        ) : (
          <RoundedImage source={require("../../assets/default-profile.png")} />
        )}

        <Name>{groupInfo.name}</Name>
        <Description>{groupInfo.description}</Description>
        {isAdmin && (
          <GroupAdminButtons
            type={type}
            groupInfo={groupInfo}
            navigation={navigation}
          />
        )}
      </ProfileContainer>

      <ListContainer>
        <GroupMemberLists />
      </ListContainer>
    </ScrollContainer>
  );
};

export default RenderGroupDetail;
