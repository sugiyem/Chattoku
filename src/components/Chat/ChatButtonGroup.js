import React from "react";
import { Icon, ListItem } from "react-native-elements";

const ChatButtonGroup = ({ buttonDetails }) => {
  return buttonDetails.map((data, id) => (
    <ListItem key={id} bottomDivider onPress={data.onPress}>
      <Icon type={data.type} name={data.icon} size={30} color={data.color} />
      <ListItem.Content>
        <ListItem.Title>{data.title}</ListItem.Title>
      </ListItem.Content>
    </ListItem>
  ));
};

export default ChatButtonGroup;
