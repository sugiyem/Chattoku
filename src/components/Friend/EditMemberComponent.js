import React from "react";
import { StyleSheet } from "react-native";
import { Icon, ListItem } from "react-native-elements";
import { firebase } from "../../services/Firebase/Config";
import {
  cancelGroupInvitation,
  removeUserFromGroup
} from "../../services/Friend/HandleGroup";
import {
  demoteAdminToMember,
  promoteMemberToAdmin
} from "../../services/Friend/HandleGroupAdmin";
import { contactType } from "../../constants/Contact";
import ContactBar from "./ContactBar";
import Caution from "../Miscellaneous/Caution";

const EditMemberComponent = ({
  item,
  isMember,
  groupInfo,
  isExpanded,
  changeExpanded
}) => {
  const currentID = firebase.auth().currentUser.uid;
  const groupID = groupInfo.id;
  const itemID = item.id;

  const alertTitle = isMember
    ? "This user will be removed from the group"
    : "This invitation will be removed";

  const isCurrentUserOwner = currentID === groupInfo.owner;
  const isVisible =
    isExpanded &&
    (!isMember || (!item.isOwner && (isCurrentUserOwner || !item.isAdmin)));

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
      title: item.isAdmin ? "Demote" : "Promote",
      type: "material-community",
      icon: item.isAdmin ? "account-arrow-down" : "account-arrow-up",
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
    if (item.isAdmin) {
      await demoteAdminToMember(groupID, itemID);
    } else {
      await promoteMemberToAdmin(groupID, itemID);
    }
  }

  const RenderButtons = () => {
    if (!isVisible) {
      return null;
    }

    return buttonDetails.map((detail, index) => (
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
  };

  return (
    <ListItem.Accordion
      bottomDivider
      content={<ContactBar type={contactType.USER} item={item} />}
      isExpanded={isExpanded}
      onPress={changeExpanded}
    >
      <RenderButtons />
    </ListItem.Accordion>
  );
};

export default EditMemberComponent;

const styles = StyleSheet.create({
  removeButton: {
    minHeight: "100%",
    backgroundColor: "red"
  }
});
