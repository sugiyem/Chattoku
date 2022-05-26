import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Avatar, ListItem } from "react-native-elements";
import HandleFavoriteButton from "./HandleFavoriteButton";

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
            if (type === "Genre") {
              navigation.navigate("EditGenre");
            } else {
              navigation.navigate("Anime");
            }
          }}
          style={styles.favoriteButton}
        >
          <Text style={styles.buttonText}>
            {type === "Genre"
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
                type === "Genre" && isEditPage ? favorites.includes(item) : true
              }
              data={type === "Genre" ? item : item.id.toString()}
            />
          }
        >
          {type === "Anime" && <Avatar source={{ uri: item.image }} />}
          <ListItem.Content>
            <ListItem.Title>
              {type === "Genre" ? item : item.title}
            </ListItem.Title>
            {type === "Genre" && isEditPage && (
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
