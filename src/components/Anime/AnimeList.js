import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ListItem } from "react-native-elements";
import { BoldText } from "../../styles/GeneralStyles";

const AnimeList = ({ item, isFavorite }) => {
  const itemScore = "MyAnimeList score: " + (item.score ? item.score : "?");
  const itemAiring =
    (item.airing ? "Started airing from: " : "Aired from: ") +
    item.aired.string;
  const itemEpisodes =
    "Number of episodes: " + (item.episodes ? item.episodes : "?");
  const itemFavorite = isFavorite ? "Favorite" : "";

  return (
    <ListItem.Content>
      <ListItem.Title>
        <BoldText size="16px" testID="title">
          {item.title}
        </BoldText>
      </ListItem.Title>
      <ListItem.Subtitle>
        <View style={styles.detailContainer}>
          <Text testID="score">{itemScore}</Text>
          <Text testID="onAir">{itemAiring}</Text>
          <Text testID="episodes">{itemEpisodes}</Text>
          <Text testID="favorite">{itemFavorite}</Text>
        </View>
      </ListItem.Subtitle>
    </ListItem.Content>
  );
};

export default AnimeList;

const styles = StyleSheet.create({
  detailContainer: {
    paddingTop: 10
  }
});
