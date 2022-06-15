import React from "react";
import { Alert, StyleSheet } from "react-native";
import { Button, ListItem } from "react-native-elements";
import { firebase } from "../../firebase/Config";
import {
  cancelGroupInvitation,
  removeUserFromGroup
} from "../../firebase/HandleGroup";
import { contactType } from "../../constants/Contact";
import ContactBar from "./ContactBar";

const EditMemberComponent = ({ items, isMember }) => {
  const userID = firebase.auth().currentUser.uid;
  const alertTitle = isMember
    ? "This user will be removed from the group"
    : "This invitation will be removed";
  const onEditButtonPress = (item) => {
    Alert.alert(
      alertTitle,
      "This action is irreversible. Do you want to continue?",
      [
        {
          text: "Cancel"
        },
        {
          text: "Continue",
          onPress: () => {
            if (isMember) {
              removeUserFromGroup(item.id);
            } else {
              cancelGroupInvitation(item.id);
            }
          }
        }
      ]
    );
  };

  const EditButton = ({ item }) => (
    <Button
      title="Remove"
      buttonStyle={styles.removeButton}
      icon={{ name: "delete", color: "white" }}
      onPress={() => onEditButtonPress(item)}
    />
  );

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
