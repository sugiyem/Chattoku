import React from "react";
import { ListItem } from "react-native-elements";
import { contactType } from "../../constants/Contact";
import ContactImage from "./ContactImage";

const ContactBar = ({ type, item }) => {
  const isUser = type === contactType.USER;

  return (
    <>
      <ContactImage item={item} />
      <ListItem.Content>
        <ListItem.Title style={{ color: "#1D428A" }} testID="name">
          {isUser ? item.username : item.name}
        </ListItem.Title>
        <ListItem.Subtitle style={{ color: "#1D428A" }} testID="info">
          {isUser ? item.bio : item.description}
        </ListItem.Subtitle>
        {item.groupRole && (
          <ListItem.Subtitle style={{ color: "#1D428A" }}>
            {item.groupRole}
          </ListItem.Subtitle>
        )}
      </ListItem.Content>
    </>
  );
};

export default ContactBar;
