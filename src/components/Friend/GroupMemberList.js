import React, { useState } from "react";
import { Platform, StyleSheet, Text } from "react-native";
import { ListItem } from "react-native-elements";
import ContactBar from "./ContactBar";
import { contactType } from "../../constants/Contact";

const GroupMemberList = ({ title, items }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const RenderTabs = () =>
    items.map((item, idx) => (
      <ListItem key={idx} bottomDivider>
        <ContactBar type={contactType.USER} item={item} />
      </ListItem>
    ));

  const SectionTitle = () => (
    <ListItem.Content>
      <ListItem.Title>
        <Text style={styles.titleText} testID="title">
          {title}
        </Text>
      </ListItem.Title>
    </ListItem.Content>
  );

  return (
    <ListItem.Accordion
      bottomDivider
      content={<SectionTitle />}
      isExpanded={isExpanded}
      onPress={() => setIsExpanded(!isExpanded)}
      testID="accordion"
    >
      {isExpanded && <RenderTabs />}
    </ListItem.Accordion>
  );
};

export default GroupMemberList;

const styles = StyleSheet.create({
  titleText: {
    fontFamily: Platform.OS === "ios" ? "Gill Sans" : "serif",
    fontSize: 20,
    fontWeight: "600",
    textDecorationLine: "underline"
  }
});
