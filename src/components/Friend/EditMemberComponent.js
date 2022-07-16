import React, { useState } from "react";
import { Icon, ListItem } from "react-native-elements";
import {
  cancelGroupInvitation,
  removeUserFromGroup
} from "../../services/Friend/HandleGroup";
import {
  demoteAdminToMember,
  promoteMemberToAdmin
} from "../../services/Friend/HandleGroupAdmin";
import { getCurrentUID } from "../../services/Profile/FetchUserInfo";
import { contactType } from "../../constants/Contact";
import ContactBar from "./ContactBar";
import Caution from "../Miscellaneous/Caution";

const EditMemberComponent = ({ item, isMember, groupInfo }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const currentID = getCurrentUID();
  const groupID = groupInfo.id;
  const itemID = item.id;

  const isOtherUserOwner = item.groupRole === "Owner";
  const isOtherUserAdmin = item.groupRole === "Admin";

  const alertTitle = isMember
    ? "This user will be removed from the group"
    : "This invitation will be removed";

  const isCurrentUserOwner = currentID === groupInfo.owner;
  const isEditable =
    !isMember ||
    (!isOtherUserOwner && (isCurrentUserOwner || !isOtherUserAdmin));

  const buttonDetails = [
    {
      title: "Remove",
      type: "material-community",
      icon: "account-remove",
      color: "red",
      onPress: onRemovePress
    }
  ];

  if (isCurrentUserOwner && isMember) {
    buttonDetails.push({
      title: isOtherUserAdmin ? "Demote" : "Promote",
      type: "material-community",
      icon: isOtherUserAdmin ? "account-arrow-down" : "account-arrow-up",
      color: "blue",
      onPress: onAdminUpdatePress
    });
  }

  function onRemovePress() {
    const handleRemove = () => {
      isMember
        ? removeUserFromGroup(groupID, itemID)
        : cancelGroupInvitation(groupID, itemID);
    };

    return Caution(alertTitle, handleRemove);
  }

  async function onAdminUpdatePress() {
    if (isOtherUserAdmin) {
      await demoteAdminToMember(groupID, itemID);
    } else {
      await promoteMemberToAdmin(groupID, itemID);
    }
  }

  const RenderButtons = () =>
    buttonDetails.map((detail, index) => (
      <ListItem key={index} onPress={detail.onPress}>
        <Icon
          type={detail.type}
          name={detail.icon}
          size={30}
          color={detail.color}
        />
        <ListItem.Content>
          <ListItem.Title>{detail.title}</ListItem.Title>
        </ListItem.Content>
      </ListItem>
    ));

  const UneditableSection = () => (
    <ListItem bottomDivider>
      <ContactBar type={contactType.USER} item={item} />
    </ListItem>
  );

  const EditableSection = () => (
    <ListItem.Accordion
      bottomDivider
      content={<ContactBar type={contactType.USER} item={item} />}
      isExpanded={isExpanded}
      onPress={() => setIsExpanded(!isExpanded)}
    >
      <RenderButtons />
    </ListItem.Accordion>
  );

  return isEditable ? <EditableSection /> : <UneditableSection />;
};

export default EditMemberComponent;
