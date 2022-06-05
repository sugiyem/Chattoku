import React from "react";
import { Avatar, ListItem } from "react-native-elements";

export const renderType = {
  ANIME: 0,
  GENRE: 1
};

const RenderFriendFavorites = ({ type, items }) => {
  return items.map((item, i) => (
    <ListItem key={i} bottomDivider>
      {type === renderType.ANIME && (
        <Avatar size="medium" source={{ uri: item.image }} />
      )}
      <ListItem.Content>
        <ListItem.Title>
          {type === renderType.GENRE ? item : item.title}
        </ListItem.Title>
      </ListItem.Content>
    </ListItem>
  ));
};

export default RenderFriendFavorites;
