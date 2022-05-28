import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Avatar, ListItem } from "react-native-elements";
import HandleFavoriteButton from "./HandleFavoriteButton";

export const renderType = {
  GENRE: 0,
  ANIME: 1,
};

const RenderFavorites = ({
  type,
  isEditPage = false,
  items,
  favorites = [],
  navigation = null,
}) => {
  return (
    <View>
      {!isEditPage && (
        <TouchableOpacity
          onPress={() => {
            if (type === renderType.GENRE) {
              navigation.navigate("EditGenre");
            } else {
              navigation.navigate("Anime");
            }
          }}
          style={styles.favoriteButton}
        >
          <Text style={styles.buttonText}>
            {type === renderType.GENRE
              ? "Add more genres to favorite"
              : "Add more anime to favorite"}
          </Text>
        </TouchableOpacity>
      )}

      {items.map((item, i) => (
        <ListItem.Swipeable
          key={i}
          bottomDivider
          rightContent={
            <HandleFavoriteButton
              type={type}
              isFavorite={
                type === renderType.GENRE && isEditPage
                  ? favorites.includes(item)
                  : true
              }
              data={type === renderType.GENRE ? item : item.id.toString()}
            />
          }
        >
          {type === renderType.ANIME && (
            <Avatar size="medium" source={{ uri: item.image }} />
          )}
          <ListItem.Content>
            <ListItem.Title>
              {type === renderType.GENRE ? item : item.title}
            </ListItem.Title>
            {type === renderType.GENRE && isEditPage && (
              <ListItem.Subtitle>
                {favorites.includes(item) ? "Favorite" : ""}
              </ListItem.Subtitle>
            )}
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem.Swipeable>
      ))}
    </View>
  );
};

export default RenderFavorites;

const styles = StyleSheet.create({
  favoriteButton: {
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 3,
    backgroundColor: "aquamarine",
    margin: 5,
    padding: 5,
  },
  buttonText: {
    color: "#2e64e5",
  },
});
