import React from "react";
import { Icon, ListItem } from "react-native-elements";

const ChatButtonGroup = ({ buttonDetails }) => {
  return buttonDetails.map((data, id) => (
    <ListItem
      key={id}
      bottomDivider
      onPress={data.onPress}
      testID={`button-${id}`}
    >
      <Icon
        type={data.type}
        name={data.icon}
        size={30}
        color={data.color}
        testID={`icon-${id}`}
      />
      <ListItem.Content>
        <ListItem.Title testID={`title-${id}`}>{data.title}</ListItem.Title>
      </ListItem.Content>
    </ListItem>
  ));
};

export default ChatButtonGroup;
