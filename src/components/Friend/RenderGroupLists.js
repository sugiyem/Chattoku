import React, { useState } from "react";
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
import { itemContainerStyle } from "../../styles/ListStyles";

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
          color: "lightblue",
          onPress: () => navigation.navigate("GroupInfo", { groupData: item })
        },
        {
          title: "Message",
          type: "material-community",
          icon: "message-processing-outline",
          color: "lightblue",
          onPress: () => {
            const data = {
              id: item.id,
              name: item.name,
              description: item.description,
              img: item.img
            };

            navigation.navigate("Chat", {
              screen: "GroupChatDetail",
              initial: false,
              params: {
                groupData: data
              }
            });
          }
        },
        {
          title: "Leave Group",
          type: "ionicon",
          icon: "exit-outline",
          color: "#fd5c63",
          onPress: () =>
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
          color: "lightblue",
          onPress: () =>
            navigation.navigate("GroupRequestInfo", { groupData: item })
        },
        {
          title: "Accept Invitation",
          type: "material",
          icon: "check",
          color: "#4FFFB0",
          onPress: () => acceptGroupInvitation(item.id)
        },
        {
          title: "Decline Invitation",
          type: "material",
          icon: "close",
          color: "#fd5c63",
          onPress: () => declineGroupInvitation(item.id)
        }
      );
      break;
  }

  return (
    <ListItem.Accordion
      bottomDivider
      containerStyle={itemContainerStyle}
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
