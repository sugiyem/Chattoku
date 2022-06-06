import React from "react";
import { Alert, StyleSheet, View } from "react-native";
import { Avatar, Icon, ListItem } from "react-native-elements";
import {
  leaveGroup,
  acceptGroupInvitation,
  declineGroupInvitation
} from "../../firebase/HandleGroup";

export const renderType = {
  GROUP: 0,
  GROUP_INVITATION: 1
};

export default RenderGroupLists = ({
  type,
  items,
  navigation,
  expandStatus,
  changeExpand
}) => {
  const datas = [];

  switch (type) {
    case renderType.GROUP:
      datas.push(
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

    case renderType.GROUP_INVITATION:
      datas.push(
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

  const RenderAccordion = ({ item }) =>
    datas.map((data, id) => (
      <ListItem key={id} bottomDivider onPress={() => data.onPress(item)}>
        <Icon name={data.icon} size={30} color="blue" />
        <ListItem.Content>
          <ListItem.Title>{data.title}</ListItem.Title>
        </ListItem.Content>
      </ListItem>
    ));

  const RenderImage = ({ item }) => {
    const imageSource =
      item.img.length > 0
        ? { uri: item.img }
        : require("../../assets/default-profile.png");

    return (
      <Avatar
        rounded
        source={imageSource}
        size="medium"
        containerStyle={styles.groupImage}
      />
    );
  };

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
          content={
            <>
              <RenderImage item={item} />
              <ListItem.Content>
                <ListItem.Title>{item.name}</ListItem.Title>
                <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
              </ListItem.Content>
            </>
          }
          isExpanded={expandStatus(index)}
          onPress={() => onRightClick(index)}
        >
          {expandStatus(index) && <RenderAccordion item={item} />}
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
  },
  groupImage: {
    marginRight: 10,
    borderColor: "black",
    borderWidth: 1
  }
});
