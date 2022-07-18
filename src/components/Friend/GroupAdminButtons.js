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
        <EditButton onPress={goToEditGroupPage} testID="editGroup">
          <EditButtonText>Edit Group Details</EditButtonText>
        </EditButton>
        <EditButton onPress={goToAddMemberPage} testID="addMember">
          <EditButtonText>Add Members</EditButtonText>
        </EditButton>
        {isOwner && (
          <EditButton onPress={onDelete} testID="deleteGroup">
            <EditButtonText>Delete Group</EditButtonText>
          </EditButton>
        )}
      </EditButtonGroup>
      <EditButtonGroup>
        <EditButton onPress={goToManageMemberPage} testID="manageMember">
          <EditButtonText>Manage Member</EditButtonText>
        </EditButton>
        <EditButton onPress={goToManageInvitationPage} testID="manageInvite">
          <EditButtonText>Manage Invitation</EditButtonText>
        </EditButton>
      </EditButtonGroup>
    </>
  );
};

export default GroupAdminButtons;
