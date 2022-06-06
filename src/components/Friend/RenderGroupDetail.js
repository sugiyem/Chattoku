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
import { Button, ListItem } from "react-native-elements";
import ContactBar, { contactType } from "./ContactBar";
import GroupOwnerButtons from "./GroupOwnerButtons";
import EditMemberComponent from "./EditMemberComponent";

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
  let sectionDetails;

  const RenderTabs = ({ items }) =>
    items.map((item, idx) => (
      <ListItem key={idx} bottomDivider>
        <ContactBar type={contactType.USER} item={item} />
      </ListItem>
    ));

  switch (type) {
    case memberType.OWNER:
      sectionDetails = [
        {
          ...memberDetails,
          title: "Members",
          render: ({ items }) => (
            <EditMemberComponent items={items} isMember={true} />
          )
        },
        {
          ...pendingMemberDetails,
          title: "Pending Members",
          render: ({ items }) => (
            <EditMemberComponent items={items} isMember={false} />
          )
        }
      ];
      break;

    case memberType.MEMBER:
      sectionDetails = [
        {
          ...memberDetails,
          title: "Members",
          render: ({ items }) => <RenderTabs items={items} />
        },
        {
          ...pendingMemberDetails,
          title: "Pending Members",
          render: ({ items }) => <RenderTabs items={items} />
        }
      ];
      break;

    case memberType.PENDING_MEMBER:
      sectionDetails = [
        {
          ...memberDetails,
          title: "Members",
          render: ({ items }) => <RenderTabs items={items} />
        }
      ];
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
          <GroupOwnerButtons groupInfo={groupInfo} navigation={navigation} />
        )}
      </View>

      <View style={styles.memberContainer}>
        {sectionDetails.map((item, index) => (
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
