import React from "react";
import {
  EditButton,
  EditButtonGroup,
  EditButtonText
} from "../../styles/InfoStyles";
import { deleteGroup } from "../../services/Friend/HandleGroup";
import { groupMemberType } from "../../constants/Group";
import Caution from "../Miscellaneous/Caution";

const GroupAdminButtons = ({ type, groupInfo, navigation }) => {
  const isOwner = type === groupMemberType.OWNER;

  function goToEditGroupPage() {
    navigation.navigate("EditGroup", { groupInfo: groupInfo });
  }

  function goToAddMemberPage() {
    navigation.navigate("AddGroupMember", {
      groupInfo: groupInfo
    });
  }

  function onDelete() {
    Caution(
      "This group will be deleted",
      async () =>
        await deleteGroup(groupInfo.id).finally(() =>
          navigation.replace("GroupList")
        )
    );
  }

  function goToManageMemberPage() {
    navigation.navigate("EditGroupMember", { groupInfo: groupInfo });
  }

  function goToManageInvitationPage() {
    navigation.navigate("EditPendingGroupMember", {
      groupInfo: groupInfo
    });
  }

  return (
    <>
      <EditButtonGroup>
        <EditButton onPress={goToEditGroupPage}>
          <EditButtonText>Edit Group Details</EditButtonText>
        </EditButton>
        <EditButton onPress={goToAddMemberPage}>
          <EditButtonText>Add Members</EditButtonText>
        </EditButton>
        {isOwner && (
          <EditButton onPress={onDelete}>
            <EditButtonText>Delete Group</EditButtonText>
          </EditButton>
        )}
      </EditButtonGroup>
      <EditButtonGroup>
        <EditButton onPress={goToManageMemberPage}>
          <EditButtonText>Manage Member</EditButtonText>
        </EditButton>
        <EditButton onPress={goToManageInvitationPage}>
          <EditButtonText>Manage Invitation</EditButtonText>
        </EditButton>
      </EditButtonGroup>
    </>
  );
};

export default GroupAdminButtons;
