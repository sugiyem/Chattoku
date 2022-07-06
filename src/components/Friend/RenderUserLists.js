import React from "react";
import { Alert, StyleSheet, View } from "react-native";
import { ListItem } from "react-native-elements";
import {
  acceptFriendRequest,
  cancelFriendRequest,
  declineFriendRequest,
  removeFriend
} from "../../services/Friend/HandleFriend";
import {
  blockUser,
  unblockUser
} from "../../services/Friend/HandleBlockedUser";
import { contactType } from "../../constants/Contact";
import { friendshipType } from "../../constants/Friend";
import ContactBar from "./ContactBar";
import ContactButtonGroup from "./ContactButtonGroup";
import Caution from "../Miscellaneous/Caution";

export default RenderUserLists = ({
  type,
  items,
  navigation,
  expandStatus,
  changeExpand
}) => {
  let buttonDetails = [
    {
      title: "Message",
      type: "material-community",
      icon: "message-processing-outline",
      color: "blue",
      onPress: (item) => {
        const data = {
          id: item.id,
          username: item.username,
          bio: item.bio,
          img: item.img
        };

        navigation.navigate("ChatList");
        navigation.navigate("ChatDetail", {
          userData: data
        });
      }
    },
    {
      title: "Block",
      type: "material",
      icon: "block",
      color: "red",
      onPress: (item) =>
        Caution("This user will be blocked", () => blockUser(item.id))
    }
  ];

  switch (type) {
    case friendshipType.FRIEND:
      buttonDetails.push(
        {
          title: "View details",
          type: "ionicon",
          icon: "open-outline",
          color: "blue",
          onPress: (item) =>
            navigation.navigate("FriendInfo", { friendData: item })
        },
        {
          title: "Unfriend",
          type: "ionicon",
          icon: "ios-person-remove-outline",
          color: "red",
          onPress: (item) =>
            Caution("This user will be removed from your friend's list", () =>
              removeFriend(item.id)
            )
        }
      );
      break;

    case friendshipType.WAITING_RESPONSE:
      buttonDetails.push({
        title: "Cancel request",
        type: "material-community",
        icon: "account-cancel-outline",
        color: "red",
        onPress: (item) =>
          Caution("This friend request will be removed", () =>
            cancelFriendRequest(item.id)
          )
      });
      break;

    case friendshipType.RECEIVING_REQUEST:
      buttonDetails.push(
        {
          title: "Accept request",
          type: "material",
          icon: "check",
          color: "green",
          onPress: (item) => acceptFriendRequest(item.id)
        },
        {
          title: "Decline request",
          type: "material",
          icon: "close",
          color: "red",
          onPress: (item) => declineFriendRequest(item.id)
        }
      );
      break;

    case friendshipType.BLOCKED:
      buttonDetails = [
        {
          title: "Unblock",
          type: "material-community",
          icon: "account-lock-open-outline",
          color: "green",
          onPress: (item) => unblockUser(item.id)
        }
      ];
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
