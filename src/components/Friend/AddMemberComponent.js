import { Alert, StyleSheet } from "react-native";
import React from "react";
import { Button, ListItem } from "react-native-elements";
import ContactImage from "./ContactImage";
import {
  addUserToGroup,
  cancelGroupInvitation,
  removeUserFromGroup
} from "../../services/Friend/HandleGroup";
import { groupMemberType } from "../../constants/Group";
import Caution from "../Miscellaneous/Caution";

const AddMemberComponent = ({ type, isOwner, item, groupID }) => {
  let buttonDetails = {
    text: "Remove",
    type: "material-community",
    icon: "account-remove",
    backgroundColor: "red",
    onPress: () =>
      Caution("User will be removed from the group", () =>
        removeUserFromGroup(groupID, item.id)
      )
  };

  switch (type) {
    case groupMemberType.OWNER:
      buttonDetails = null;
      break;

    case groupMemberType.ADMIN:
      if (!isOwner) {
        buttonDetails = null;
      }
      break;

    case groupMemberType.PENDING_MEMBER:
      buttonDetails = {
        text: "Cancel",
        type: "material-community",
        icon: "account-cancel",
        backgroundColor: "red",
        onPress: () =>
          Caution("This invitation will be removed", () =>
            cancelGroupInvitation(groupID, item.id)
          )
      };
      break;

    case groupMemberType.NON_MEMBER:
      buttonDetails = {
        text: "Add",
        type: "material-community",
        icon: "account-plus",
        backgroundColor: "green",
        onPress: () => addUserToGroup(groupID, item.id)
      };
      break;
  }

  const EditButton = () =>
    buttonDetails && (
      <Button
        title={buttonDetails.text}
        icon={{
          type: buttonDetails.type,
          name: buttonDetails.icon,
          color: "white"
        }}
        buttonStyle={[
          styles.button,
          { backgroundColor: buttonDetails.backgroundColor }
        ]}
        onPress={buttonDetails.onPress}
      />
    );

  const groupRole =
    type === groupMemberType.OWNER
      ? "Owner"
      : type === groupMemberType.ADMIN
      ? "Admin"
      : type === groupMemberType.MEMBER
      ? "Member"
      : type === groupMemberType.PENDING_MEMBER
      ? "Pending Member"
      : "Not A Member";

  return (
    <ListItem.Swipeable bottomDivider rightContent={<EditButton />}>
      <>
        <ContactImage item={item} />
        <ListItem.Content>
          <ListItem.Title>{item.username}</ListItem.Title>
          <ListItem.Subtitle>{item.bio}</ListItem.Subtitle>
          <ListItem.Subtitle>{groupRole}</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron />
      </>
    </ListItem.Swipeable>
  );
};

export default AddMemberComponent;

const styles = StyleSheet.create({
  button: {
    minHeight: "100%"
  }
});
