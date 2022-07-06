import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { ListItem } from "react-native-elements";
import {
  leaveGroup,
  acceptGroupInvitation,
  declineGroupInvitation
} from "../../services/Friend/HandleGroup";
import { contactType } from "../../constants/Contact";
import { groupListType } from "../../constants/Group";
import ContactBar from "./ContactBar";
import ContactButtonGroup from "./ContactButtonGroup";
import Caution from "../Miscellaneous/Caution";

export default RenderGroupLists = ({ type, item, navigation }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const buttonDetails = [];

  switch (type) {
    case groupListType.GROUP:
      buttonDetails.push(
        {
          title: "Detail",
          type: "ionicon",
          icon: "open-outline",
          color: "blue",
          onPress: (item) =>
            navigation.navigate("GroupInfo", { groupData: item })
        },
        {
          title: "Message",
          type: "material-community",
          icon: "message-processing-outline",
          color: "blue",
          onPress: (item) => {
            const data = {
              id: item.id,
              name: item.name,
              description: item.description,
              img: item.img
            };

            navigation.navigate("GroupChatList");
            navigation.navigate("GroupChatDetail", {
              groupData: data
            });
          }
        },
        {
          title: "Leave Group",
          type: "ionicon",
          icon: "exit-outline",
          color: "red",
          onPress: (item) =>
            Caution("You will leave this group", () => leaveGroup(item.id))
        }
      );
      break;

    case groupListType.GROUP_INVITATION:
      buttonDetails.push(
        {
          title: "Detail",
          type: "ionicon",
          icon: "open-outline",
          color: "blue",
          onPress: (item) =>
            navigation.navigate("GroupRequestInfo", { groupData: item })
        },
        {
          title: "Accept Invitation",
          type: "material",
          icon: "check",
          color: "green",
          onPress: (item) => acceptGroupInvitation(item.id)
        },
        {
          title: "Decline Invitation",
          type: "material",
          icon: "close",
          color: "red",
          onPress: (item) => declineGroupInvitation(item.id)
        }
      );
      break;
  }

  return (
    <ListItem.Accordion
      bottomDivider
      content={<ContactBar type={contactType.GROUP} item={item} />}
      isExpanded={isExpanded}
      onPress={() => setIsExpanded(!isExpanded)}
    >
      {isExpanded && (
        <ContactButtonGroup item={item} buttonDetails={buttonDetails} />
      )}
    </ListItem.Accordion>
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
