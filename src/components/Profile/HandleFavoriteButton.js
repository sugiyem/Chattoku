import { StyleSheet } from "react-native";
import React from "react";
import { Button } from "react-native-elements";

import {
  addGenreToFavorite,
  removeGenreFromFavorite,
  removeAnimeFromFavorite
} from "../../firebase/HandleFavorite";
import { favoriteType } from "../../constants/Favorite";

const HandleFavoriteButton = ({ type, isFavorite = true, data }) => {
  return (
    <Button
      title={isFavorite ? "Remove" : "Add"}
      buttonStyle={isFavorite ? styles.removeButton : styles.addButton}
      icon={{ name: isFavorite ? "delete" : "add", color: "white" }}
      onPress={() => {
        if (type === favoriteType.GENRE) {
          if (isFavorite) {
            removeGenreFromFavorite(data);
          } else {
            addGenreToFavorite(data);
          }
        } else {
          removeAnimeFromFavorite(data);
        }
      }}
    />
  );
};

export default HandleFavoriteButton;

const styles = StyleSheet.create({
  addButton: {
    minHeight: "100%",
    backgroundColor: "green"
  },
  removeButton: {
    minHeight: "100%",
    backgroundColor: "red"
  }
});
