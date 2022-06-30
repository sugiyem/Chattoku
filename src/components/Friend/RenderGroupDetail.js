import React from "react";
import { Platform, StyleSheet, Text } from "react-native";
import { ListItem } from "react-native-elements";
import {
  Button,
  ButtonText,
  RoundedImage,
  ScrollContainer
} from "../../styles/GeneralStyles";
import {
  Description,
  Name,
  ListContainer,
  ProfileContainer
} from "../../styles/InfoStyles";
import { contactType } from "../../constants/Contact";
import { groupMemberType } from "../../constants/Group";
import ContactBar from "./ContactBar";
import GroupAdminButtons from "./GroupAdminButtons";

const RenderGroupDetail = ({
  type,
  groupInfo,
  memberDetails = {},
  pendingMemberDetails = {},
  navigation
}) => {
  const groupID = groupInfo.id;
  const isAdmin =
    type === groupMemberType.OWNER || type === groupMemberType.ADMIN;
  const isMember = isAdmin || type === groupMemberType.MEMBER;

  const RenderTabs = ({ items }) =>
    items.map((item, idx) => (
      <ListItem key={idx} bottomDivider>
        <ContactBar type={contactType.USER} item={item} />
      </ListItem>
    ));

  const sectionDetails = [
    {
      ...memberDetails,
      title: "Members",
      render: ({ items }) => <RenderTabs items={items} />
    }
  ];

  if (isMember) {
    sectionDetails.push({
      ...pendingMemberDetails,
      title: "Pending Members",
      render: ({ items }) => <RenderTabs items={items} />
    });
  }

  const ListTitle = ({ item }) => (
    <ListItem.Content>
      <ListItem.Title>
        <Text style={styles.titleText}>{item.title}</Text>
      </ListItem.Title>
    </ListItem.Content>
  );

  const GroupMemberLists = () =>
    sectionDetails.map((item, index) => (
      <ListItem.Accordion
        bottomDivider
        key={index}
        content={<ListTitle item={item} />}
        isExpanded={item.isExpanded}
        onPress={() => item.changeExpanded(!item.isExpanded)}
      >
        {item.isExpanded && <item.render items={item.data} />}
      </ListItem.Accordion>
    ));

  return (
    <ScrollContainer>
      <Button onPress={() => navigation.replace("GroupList")}>
        <ButtonText color="#000000">Go Back</ButtonText>
      </Button>

      <ProfileContainer>
        {groupInfo.img.length > 0 ? (
          <RoundedImage source={{ uri: groupInfo.img }} />
        ) : (
          <RoundedImage source={require("../../assets/default-profile.png")} />
        )}

        <Name>{groupInfo.name}</Name>
        <Description>{groupInfo.description}</Description>
        {isAdmin && (
          <GroupAdminButtons
            type={type}
            groupInfo={groupInfo}
            navigation={navigation}
          />
        )}
      </ProfileContainer>

      <ListContainer>
        <GroupMemberLists />
      </ListContainer>
    </ScrollContainer>
  );
};

export default RenderGroupDetail;

const styles = StyleSheet.create({
  titleText: {
    fontFamily: Platform.OS === "ios" ? "Gill Sans" : "serif",
    fontSize: 20,
    fontWeight: "600",
    textDecorationLine: "underline"
  }
});
