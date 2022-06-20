import React from "react";
import { Alert, StyleSheet, View } from "react-native";
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

export default RenderGroupLists = ({
  type,
  items,
  navigation,
  expandStatus,
  changeExpand
}) => {
  const buttonDetails = [];

  switch (type) {
    case groupListType.GROUP:
      buttonDetails.push(
        {
          title: "Detail",
          icon: "folder-open",
          onPress: (item) =>
            navigation.navigate("GroupInfo", { groupData: item })
        },
        {
          title: "Message",
          icon: "message",
          onPress: (item) =>
            navigation.navigate("Chat", {
              screen: "GroupChatDetail",
              params: { groupID: item.id, groupName: item.name }
            })
        },
        {
          title: "Leave Group",
          icon: "close",
          onPress: (item) => {
            Alert.alert(
              "You will leave this group",
              "This action is irreversible. Do you want to continue?",
              [
                {
                  text: "Cancel"
                },
                {
                  text: "Continue",
                  onPress: () => leaveGroup(item.id)
                }
              ]
            );
          }
        }
      );
      break;

    case groupListType.GROUP_INVITATION:
      buttonDetails.push(
        {
          title: "Detail",
          icon: "folder-open",
          onPress: (item) =>
            navigation.navigate("GroupRequestInfo", { groupData: item })
        },
        {
          title: "Accept Invitation",
          icon: "check",
          onPress: (item) => acceptGroupInvitation(item.id)
        },
        {
          title: "Decline Invitation",
          icon: "close",
          onPress: (item) => declineGroupInvitation(item.id)
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
          content={<ContactBar type={contactType.GROUP} item={item} />}
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
