import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { Card } from "react-native-elements";
import { BoldText, Button } from "../../styles/GeneralStyles";
import * as Linking from "expo-linking";
import {
  addAnimeToFavorite,
  removeAnimeFromFavorite
} from "../../services/Anime/HandleFavorite";
import { animeDetailsToGenreString } from "../../services/Anime/AnimeAndGenreConverter";

const AnimeCard = ({ item, isFavorite, onPress1 = null, onPress2 = null }) => {
  const cleanedItem = {
    ...item,
    images: item.images.jpg.image_url,
    genres: item.genres.map((value) => value.name),
    themes: item.themes.map((value) => value.name),
    demographics: item.demographics.map((value) => value.name)
  };

  const onEditFavoritePress = () => {
    if (onPress1) {
      onPress1();
      return;
    }

    if (isFavorite) {
      removeAnimeFromFavorite(item.mal_id.toString());
    } else {
      addAnimeToFavorite(item);
    }
  };

  const onOpenURLPress = () => {
    if (onPress2) {
      onPress2();
      return;
    }

    Linking.openURL(cleanedItem.url);
  };

  return (
    <Card>
      <Card.Title style={styles.topicText} testID="title">
        {cleanedItem.title}
      </Card.Title>
      <Card.Divider />
      <Card.Image source={{ uri: cleanedItem.images }} style={styles.image} />
      <Card.Divider />
      <View>
        <Button
          color="#ADD8E6"
          testID="editFavorite"
          onPress={onEditFavoritePress}
        >
          {isFavorite ? (
            <Text>Remove this anime from favorite</Text>
          ) : (
            <Text> Add this anime to favorite </Text>
          )}
        </Button>
        <BoldText size="20px">Synopsis:</BoldText>
        <Text testID="synopsis">{cleanedItem.synopsis}</Text>
        <BoldText size="20px">Genres: </BoldText>
        <Text testID="genres">{animeDetailsToGenreString(cleanedItem)}</Text>
        <Button color="#ADD8E6" testID="openURL" onPress={onOpenURLPress}>
          <Text>Click here for more information!</Text>
        </Button>
      </View>
    </Card>
  );
};

export default AnimeCard;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: undefined,
    aspectRatio: 3 / 4
  },
  topicText: {
    fontWeight: "bold",
    fontFamily: Platform.OS === "ios" ? "Gill Sans" : "serif",
    fontSize: 20
  }
});
