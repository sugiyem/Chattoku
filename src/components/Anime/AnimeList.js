import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { ListItem } from "react-native-elements";

const AnimeList = ({ item, isFavorite }) => {
  return (
    <ListItem.Content>
      <ListItem.Title>
        <Text style={styles.titleText}>{item.title}</Text>
      </ListItem.Title>
      <ListItem.Subtitle>
        <View style={styles.detailContainer}>
          <Text>MyAnimeList score: {item.score ? item.score : "?"}</Text>
          {item.airing ? (
            <Text>Started airing from: {item.aired.string.slice(0, -5)}</Text>
          ) : (
            <Text>Aired from: {item.aired.string}</Text>
          )}

          <Text>Number of episodes: {item.episodes ? item.episodes : "?"}</Text>
          <Text>{isFavorite ? "Favorite" : ""}</Text>
        </View>
      </ListItem.Subtitle>
    </ListItem.Content>
  );
};

export default AnimeList;

const styles = StyleSheet.create({
  titleText: {
    fontFamily: Platform.OS === "ios" ? "Gill Sans" : "serif",
    fontWeight: "bold",
  },
  detailContainer: {
    paddingTop: 10,
  },
});
