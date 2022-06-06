import { Alert, StyleSheet } from "react-native";
import React from "react";
import { Button, ListItem } from "react-native-elements";
import ContactImage from "./ContactImage";
import {
  addUserToGroup,
  cancelGroupInvitation,
  removeUserFromGroup
} from "../../firebase/HandleGroup";

export const userType = {
  MEMBER: 0,
  PENDING_MEMBER: 1,
  NON_MEMBER: 2
};

const AddMemberComponent = ({ type, item, groupID }) => {
  let buttonDetails = null;

  switch (type) {
    case userType.MEMBER:
      buttonDetails = {
        text: "Remove",
        icon: "delete",
        backgroundColor: "red",
        description: "Member",
        onPress: () =>
          Alert.alert(
            "User will be removed from the group",
            "This action is irreversible. Do you want to continue?",
            [
              {
                text: "Cancel"
              },
              {
                text: "Continue",
                onPress: () => removeUserFromGroup(groupID, item.id)
              }
            ]
          )
      };
      break;

    case userType.PENDING_MEMBER:
      buttonDetails = {
        text: "Cancel",
        icon: "delete",
        backgroundColor: "red",
        description: "Pending Member",
        onPress: () =>
          Alert.alert(
            "This invitation will be removed",
            "This action is irreversible. Do you want to continue?",
            [
              {
                text: "Cancel"
              },
              {
                text: "Continue",
                onPress: () => cancelGroupInvitation(groupID, item.id)
              }
            ]
          )
      };
      break;

    case userType.NON_MEMBER:
      buttonDetails = {
        text: "Add",
        icon: "add",
        backgroundColor: "green",
        description: "Not A Member",
        onPress: () => addUserToGroup(groupID, item.id)
      };
      break;
  }

  return (
    <ListItem.Swipeable
      bottomDivider
      rightContent={
        <Button
          title={buttonDetails.text}
          icon={{ name: buttonDetails.icon, color: "white" }}
          buttonStyle={[
            styles.button,
            { backgroundColor: buttonDetails.backgroundColor }
          ]}
          onPress={buttonDetails.onPress}
        />
      }
    >
      <>
        <ContactImage item={item} />
        <ListItem.Content>
          <ListItem.Title>{item.username}</ListItem.Title>
          <ListItem.Subtitle>{item.bio}</ListItem.Subtitle>
          <ListItem.Subtitle>{buttonDetails.description}</ListItem.Subtitle>
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
