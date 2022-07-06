import React, { useState } from "react";
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

export default RenderUserLists = ({ type, item, navigation }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  let buttonDetails = [
    {
      title: "Message",
      type: "material-community",
      icon: "message-processing-outline",
      color: "blue",
      onPress: () => {
        const data = {
          id: item.id,
          username: item.username,
          bio: item.bio,
          img: item.img
        };

        navigation.navigate("Chat", {
          screen: "ChatDetail",
          initial: false,
          params: { userData: data }
        });
      }
    },
    {
      title: "Block",
      type: "material",
      icon: "block",
      color: "red",
      onPress: () =>
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
          onPress: () => navigation.navigate("FriendInfo", { friendData: item })
        },
        {
          title: "Unfriend",
          type: "ionicon",
          icon: "ios-person-remove-outline",
          color: "red",
          onPress: () =>
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
        onPress: () =>
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
          onPress: () => acceptFriendRequest(item.id)
        },
        {
          title: "Decline request",
          type: "material",
          icon: "close",
          color: "red",
          onPress: () =>
            Caution("This friend request will be declined", () =>
              declineFriendRequest(item.id)
            )
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
          onPress: () =>
            Caution("This user will be unblocked", () => unblockUser(item.id))
        }
      ];
  }

  return (
    <ListItem.Accordion
      bottomDivider
      content={<ContactBar type={contactType.USER} item={item} />}
      isExpanded={isExpanded}
      onPress={() => setIsExpanded(!isExpanded)}
    >
      {isExpanded && (
        <ContactButtonGroup item={item} buttonDetails={buttonDetails} />
      )}
    </ListItem.Accordion>
  );
};
