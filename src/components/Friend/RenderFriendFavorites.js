import React from "react";
import { Avatar, ListItem } from "react-native-elements";
import { favoriteType } from "../../constants/Favorite";

const RenderFriendFavorites = ({ type, items }) => {
  return items.map((item, i) => (
    <ListItem key={i} bottomDivider>
      {type === favoriteType.ANIME && (
        <Avatar size="medium" source={{ uri: item.image }} />
      )}
      <ListItem.Content>
        <ListItem.Title>
          {type === favoriteType.GENRE ? item : item.title}
        </ListItem.Title>
      </ListItem.Content>
    </ListItem>
  ));
};

export default RenderFriendFavorites;
