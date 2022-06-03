import React from "react";
import { Alert, StyleSheet, View } from "react-native";
import { Avatar, Icon, ListItem } from "react-native-elements";
import {
  acceptFriendRequest,
  cancelFriendRequest,
  declineFriendRequest,
  removeFriend
} from "../../firebase/HandleFriend";

export const renderType = {
  FRIEND: 0,
  REQUEST_SENT: 1,
  REQUEST_RECEIVED: 2
};

export default RenderUserLists = ({
  type,
  items,
  navigation,
  expandStatus,
  changeExpand
}) => {
  const datas = [
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
    case renderType.FRIEND:
      datas.push({
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
      });
      break;

    case renderType.REQUEST_SENT:
      datas.push({
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

    case renderType.REQUEST_RECEIVED:
      datas.push(
        {
          title: "Accept request",
          icon: "checkmark",
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
        containerStyle={styles.userImage}
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
                <ListItem.Title>{item.username}</ListItem.Title>
                <ListItem.Subtitle>{item.bio}</ListItem.Subtitle>
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
  userImage: {
    marginRight: 10,
    borderColor: "black",
    borderWidth: 1
  }
});
