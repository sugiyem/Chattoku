import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Avatar, ListItem } from "react-native-elements";
import { favoriteType } from "../../constants/Favorite";
import { ListTitleText, elementContainerStyle } from "../../styles/InfoStyles";
import { itemContainerStyle } from "../../styles/ListStyles";

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
      <ListItem
        key={index}
        containerStyle={styles.elementContainer}
        bottomDivider
      >
        {isAnime && <Avatar size="medium" source={{ uri: item.image }} />}
        <ListItem.Content>
          <ListItem.Title style={{ color: "#F0F8FF" }}>
            {isAnime ? item.title : item}
          </ListItem.Title>
        </ListItem.Content>
      </ListItem>
    ));

  return (
    <ListItem.Accordion
      bottomDivider
      content={<Title />}
      isExpanded={isExpanded}
      containerStyle={itemContainerStyle}
      onPress={() => setIsExpanded(!isExpanded)}
    >
      {isExpanded && <FavoriteList />}
    </ListItem.Accordion>
  );
};

export default RenderFriendFavorites;

const styles = StyleSheet.create({
  elementContainer: {
    marginVertical: 2,
    borderRadius: 20,
    borderWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#011F5B",
    backgroundColor: "#0076ce"
  }
});
