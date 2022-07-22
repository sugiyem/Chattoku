import React, { useState } from "react";
import { Platform, StyleSheet, Text } from "react-native";
import { ListItem } from "react-native-elements";
import ContactBar from "./ContactBar";
import { contactType } from "../../constants/Contact";
import { itemContainerStyle } from "../../styles/ListStyles";
import { ListTitleText } from "../../styles/InfoStyles";

const GroupMemberList = ({ title, items }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const RenderTabs = () =>
    items.map((item, idx) => (
      <ListItem
        key={idx}
        containerStyle={styles.elementContainer}
        bottomDivider
      >
        <ContactBar type={contactType.USER} item={item} />
      </ListItem>
    ));

  const SectionTitle = () => (
    <ListItem.Content>
      <ListItem.Title>
        <ListTitleText testID="title">{title}</ListTitleText>
      </ListItem.Title>
    </ListItem.Content>
  );

  return (
    <ListItem.Accordion
      bottomDivider
      underlayColor="invisible"
      containerStyle={itemContainerStyle}
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
  elementContainer: {
    marginVertical: 2,
    borderRadius: 20,
    borderWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#011F5B",
    backgroundColor: "#A4DDED"
  }
});
