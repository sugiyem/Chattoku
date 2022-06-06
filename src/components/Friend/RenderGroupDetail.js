import React from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { Avatar, Button, ListItem } from "react-native-elements";

import { firebase } from "../../firebase/Config";
import {
  deleteGroup,
  removeUserFromGroup,
  cancelGroupInvitation
} from "../../firebase/HandleGroup";

export const memberType = {
  OWNER: 0,
  MEMBER: 1,
  PENDING_MEMBER: 2
};

const RenderGroupDetail = ({
  type,
  groupInfo,
  memberDetails = {},
  pendingMemberDetails = {},
  navigation
}) => {
  const datas = [];
  const userID = firebase.auth().currentUser.uid;

  const RenderImage = ({ item }) => {
    console.log(item);

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

  const Bar = ({ item }) => (
    <>
      <RenderImage item={item} />
      <ListItem.Content>
        <ListItem.Title>{item.username}</ListItem.Title>
        <ListItem.Subtitle>{item.bio}</ListItem.Subtitle>
      </ListItem.Content>
    </>
  );

  switch (type) {
    case memberType.OWNER:
      datas.push(
        {
          ...memberDetails,
          title: "Members",
          render: ({ items }) =>
            items.map((item, idx) => (
              <ListItem.Swipeable
                key={idx}
                bottomDivider
                rightContent={
                  item.id !== userID && (
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
                              onPress: () =>
                                removeUserFromGroup(groupInfo.id, item.id)
                            }
                          ]
                        )
                      }
                    />
                  )
                }
              >
                <Bar item={item} />
                <ListItem.Chevron />
              </ListItem.Swipeable>
            ))
        },
        {
          ...pendingMemberDetails,
          title: "Pending Members",
          render: ({ items }) =>
            items.map((item, idx) => (
              <ListItem.Swipeable
                key={idx}
                bottomDivider
                rightContent={
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
                            onPress: () =>
                              cancelGroupInvitation(groupInfo.id, item.id)
                          }
                        ]
                      )
                    }
                  />
                }
              >
                <Bar item={item} />
              </ListItem.Swipeable>
            ))
        }
      );
      break;
    case memberType.MEMBER:
      datas.push(
        {
          ...memberDetails,
          title: "Members",
          render: ({ items }) =>
            items.map((item, idx) => (
              <ListItem key={idx} bottomDivider>
                <Bar item={item} />
              </ListItem>
            ))
        },
        {
          ...pendingMemberDetails,
          title: "Pending Members",
          render: ({ items }) =>
            items.map((item, idx) => (
              <ListItem key={idx} bottomDivider>
                <Bar item={item} />
              </ListItem>
            ))
        }
      );
      break;
    case memberType.PENDING_MEMBER:
      datas.push({
        ...memberDetails,
        title: "Members",
        render: ({ items }) =>
          items.map((item, idx) => (
            <ListItem key={idx} bottomDivider>
              <Bar item={item} />
            </ListItem>
          ))
      });
      break;
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ alignItems: "center" }}
    >
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.replace("GroupList")}
      >
        <Text style={styles.backButtonText}>Go Back</Text>
      </TouchableOpacity>
      <View style={styles.contentContainer}>
        {groupInfo.img.length > 0 ? (
          <Image style={styles.img} source={{ uri: groupInfo.img }} />
        ) : (
          <Image
            style={styles.img}
            source={require("../../assets/default-profile.png")}
          />
        )}

        <Text style={styles.name}>{groupInfo.name}</Text>
        <Text style={styles.description}>{groupInfo.description}</Text>
        {type === memberType.OWNER && (
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                navigation.navigate("EditGroup", { groupInfo: groupInfo });
              }}
            >
              <Text style={styles.buttonText}>Edit Group Details</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                navigation.navigate("AddGroupMember", {
                  groupID: groupInfo.id
                });
              }}
            >
              <Text style={styles.buttonText}>Add Members</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                Alert.alert(
                  "This group will be deleted",
                  "This action is irreversible. Do you want to continue?",
                  [
                    {
                      text: "Cancel"
                    },
                    {
                      text: "Continue",
                      onPress: () => deleteGroup(groupInfo.id, navigation)
                    }
                  ]
                );
              }}
            >
              <Text style={styles.buttonText}>Delete Group</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View style={styles.memberContainer}>
        {datas.map((item, index) => (
          <ListItem.Accordion
            bottomDivider
            key={index}
            content={
              <ListItem.Content>
                <ListItem.Title>
                  <Text style={styles.titleText}>{item.title}</Text>
                </ListItem.Title>
              </ListItem.Content>
            }
            isExpanded={item.isExpanded}
            onPress={() => item.changeExpanded(!item.isExpanded)}
          >
            {item.isExpanded && <item.render items={item.data} />}
          </ListItem.Accordion>
        ))}
      </View>
    </ScrollView>
  );
};

export default RenderGroupDetail;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "darkcyan",
    padding: 5,
    flex: 1
  },
  contentContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10
  },
  memberContainer: {
    alignSelf: "stretch",
    borderTopWidth: 1,
    borderTopColor: "black",
    margin: 10,
    padding: 5
  },
  img: {
    height: 150,
    width: 150,
    borderRadius: 75
  },
  name: {
    fontFamily: Platform.OS === "ios" ? "Gill Sans" : "serif",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10
  },
  description: {
    fontSize: 15,
    fontWeight: "600",
    color: "aquamarine",
    textAlign: "center",
    marginBottom: 10
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "stretch",
    marginBottom: 10
  },
  button: {
    borderColor: "navy",
    borderWidth: 2,
    borderRadius: 3,
    backgroundColor: "white",
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 5
  },
  buttonText: {
    color: "#2e64e5",
    fontSize: 13
  },
  backButton: {
    alignSelf: "stretch",
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: "aquamarine",
    margin: 5,
    padding: 5
  },
  backButtonText: {
    textAlign: "center"
  },
  removeButton: {
    minHeight: "100%",
    backgroundColor: "red"
  },
  titleText: {
    fontFamily: Platform.OS === "ios" ? "Gill Sans" : "serif",
    fontSize: 20,
    fontWeight: "600",
    textDecorationLine: "underline"
  },
  userImage: {
    marginRight: 10,
    borderColor: "black",
    borderWidth: 1
  }
});
