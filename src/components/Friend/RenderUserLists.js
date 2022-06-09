import React from "react";
import { Alert, StyleSheet, View } from "react-native";
import { ListItem } from "react-native-elements";
import {
  acceptFriendRequest,
  cancelFriendRequest,
  declineFriendRequest,
  removeFriend
} from "../../firebase/HandleFriend";

import ContactBar, { contactType } from "./ContactBar";
import ContactButtonGroup from "./ContactButtonGroup";
import { friendshipType } from "../../constants/Friend";

export default RenderUserLists = ({
  type,
  items,
  navigation,
  expandStatus,
  changeExpand
}) => {
  const buttonDetails = [
    {
      title: "Message",
      icon: "message",
      onPress: (item) =>
        navigation.navigate("Chat", {
          screen: "ChatDetail",
          params: { recipientID: item.id, recipientUsername: item.username }
        })
    }
  ];

  switch (type) {
    case friendshipType.FRIEND:
      buttonDetails.push(
        {
          title: "View details",
          icon: "folder-open",
          onPress: (item) =>
            navigation.navigate("FriendInfo", { friendData: item })
        },
        {
          title: "Unfriend",
          icon: "person-remove",
          onPress: (item) => {
            Alert.alert(
              "This user will be removed from your friend's list",
              "This action is irreversible. Do you want to continue?",
              [
                {
                  text: "Cancel"
                },
                {
                  text: "Continue",
                  onPress: () => removeFriend(item.id)
                }
              ]
            );
          }
        }
      );
      break;

    case friendshipType.WAITING_RESPONSE:
      buttonDetails.push({
        title: "Cancel request",
        icon: "close",
        onPress: (item) => {
          Alert.alert(
            "This friend request will be removed",
            "This action is irreversible. Do you want to continue?",
            [
              {
                text: "Cancel"
              },
              {
                text: "Continue",
                onPress: () => cancelFriendRequest(item.id)
              }
            ]
          );
        }
      });
      break;

    case friendshipType.RECEIVING_REQUEST:
      buttonDetails.push(
        {
          title: "Accept request",
          icon: "check",
          onPress: (item) => acceptFriendRequest(item.id)
        },
        {
          title: "Decline request",
          icon: "close",
          onPress: (item) => declineFriendRequest(item.id)
        }
      );
      break;
  }

  const onRightClick = (index) => {
    if (expandStatus(index)) {
      changeExpand(null);
    } else {
      changeExpand(index);
    }
  };

  return (
    <View style={styles.container}>
      {items.map((item, index) => (
        <ListItem.Accordion
          key={index}
          bottomDivider
          content={<ContactBar type={contactType.USER} item={item} />}
          isExpanded={expandStatus(index)}
          onPress={() => onRightClick(index)}
        >
          {expandStatus(index) && (
            <ContactButtonGroup item={item} buttonDetails={buttonDetails} />
          )}
        </ListItem.Accordion>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "stretch",
    margin: 10,
    padding: 5
  }
});
