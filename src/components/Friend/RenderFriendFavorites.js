import React, { useState } from "react";
import { Avatar, ListItem } from "react-native-elements";
import { favoriteType } from "../../constants/Favorite";
import { ListTitleText } from "../../styles/InfoStyles";

const RenderFriendFavorites = ({ type, title, data }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const isAnime = type === favoriteType.ANIME;

  const Title = () => (
    <ListItem.Content>
      <ListItem.Title>
        <ListTitleText>{title}</ListTitleText>
      </ListItem.Title>
    </ListItem.Content>
  );

  const FavoriteList = () =>
    data.map((item, index) => (
      <ListItem key={index} bottomDivider>
        {isAnime && <Avatar size="medium" source={{ uri: item.image }} />}
        <ListItem.Content>
          <ListItem.Title>{isAnime ? item.title : item}</ListItem.Title>
        </ListItem.Content>
      </ListItem>
    ));

  return (
    <ListItem.Accordion
      bottomDivider
      content={<Title />}
      isExpanded={isExpanded}
      onPress={() => setIsExpanded(!isExpanded)}
    >
      {isExpanded && <FavoriteList />}
    </ListItem.Accordion>
  );
};

export default RenderFriendFavorites;
