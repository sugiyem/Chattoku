import React from "react";
import { Alert, StyleSheet } from "react-native";
import { Button, ListItem } from "react-native-elements";
import { firebase } from "../../firebase/Config";
import {
  cancelGroupInvitation,
  removeUserFromGroup
} from "../../firebase/HandleGroup";
import ContactBar, { contactType } from "./ContactBar";

const EditMemberComponent = ({ items, isMember }) => {
  const userID = firebase.auth().currentUser.uid;
  let EditButton;

  if (isMember) {
    EditButton = ({ item }) => (
      <Button
        title="Remove"
        buttonStyle={styles.removeButton}
        icon={{ name: "delete", color: "white" }}
        onPress={() =>
          Alert.alert(
            "This user will be removed from the group",
            "This action is irreversible. Do you want to continue?",
            [
              {
                text: "Cancel"
              },
              {
                text: "Continue",
                onPress: () => removeUserFromGroup(groupInfo.id, item.id)
              }
            ]
          )
        }
      />
    );
  } else {
    EditButton = ({ item }) => (
      <Button
        title="Remove"
        buttonStyle={styles.removeButton}
        icon={{ name: "delete", color: "white" }}
        onPress={() =>
          Alert.alert(
            "This invitation will be removed",
            "This action is irreversible. Do you want to continue?",
            [
              {
                text: "Cancel"
              },
              {
                text: "Continue",
                onPress: () => cancelGroupInvitation(groupInfo.id, item.id)
              }
            ]
          )
        }
      />
    );
  }

  return items.map((item, idx) => (
    <ListItem.Swipeable
      key={idx}
      bottomDivider
      rightContent={item.id !== userID && <EditButton item={item} />}
    >
      <ContactBar type={contactType.USER} item={item} />
      <ListItem.Chevron />
    </ListItem.Swipeable>
  ));
};

export default EditMemberComponent;

const styles = StyleSheet.create({
  removeButton: {
    minHeight: "100%",
    backgroundColor: "red"
  }
});
