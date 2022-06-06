import React from "react";
import { ListItem } from "react-native-elements";
import ContactImage from "./ContactImage";

export const contactType = {
  USER: 0,
  GROUP: 1
};

const ContactBar = ({ type, item }) => {
  const isUser = type === contactType.USER;

  return (
    <>
      <ContactImage item={item} />
      <ListItem.Content>
        <ListItem.Title>{isUser ? item.username : item.name}</ListItem.Title>
        <ListItem.Subtitle>
          {isUser ? item.bio : item.description}
        </ListItem.Subtitle>
      </ListItem.Content>
    </>
  );
};

export default ContactBar;
