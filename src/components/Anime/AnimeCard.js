import React from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Card } from "react-native-elements";
import * as Linking from "expo-linking";
import { firebase } from "../../firebase/Config";

const AnimeCard = ({ item, isFavorite }) => {
  return (
    <Card>
      <Card.Title style={styles.topicText}>{item.title}</Card.Title>
      <Card.Divider />
      <Card.Image
        source={{ uri: item.images.jpg.image_url }}
        style={styles.image}
      />
      <Card.Divider />
      <View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if (isFavorite) {
              removeFromFavorite(item);
            } else {
              addToFavorite(item);
            }
          }}
        >
          {isFavorite ? (
            <Text>Remove this anime from favorite</Text>
          ) : (
            <Text> Add this anime to favorite </Text>
          )}
        </TouchableOpacity>
        <Text style={styles.topicText}>Synopsis:</Text>
        <Text>{item.synopsis}</Text>
        <Text style={styles.topicText}>Genres: </Text>
        <Text>
          {item.genres.reduce((x, y) => x + ", " + y.name, "").substring(2)}
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            Linking.openURL(item.url);
          }}
        >
          <Text>Click here for more information!</Text>
        </TouchableOpacity>
      </View>
    </Card>
  );
};

export default AnimeCard;

async function addToFavorite(item) {
  const userID = await firebase.auth().currentUser.uid;

  await firebase
    .firestore()
    .collection("users")
    .doc(userID)
    .collection("anime")
    .doc(item.mal_id.toString())
    .set({
      id: item.mal_id,
      title: item.title,
      image: item.images.jpg.image_url,
      url: item.url,
      genres: item.genres,
    })
    .then(() => {
      Alert.alert("Anime succesfully added to favorite");
    })
    .catch((error) => {
      Alert.alert(error.message);
    });
}

async function removeFromFavorite(item) {
  const userID = await firebase.auth().currentUser.uid;

  await firebase
    .firestore()
    .collection("users")
    .doc(userID)
    .collection("anime")
    .doc(item.mal_id.toString())
    .delete()
    .then(() => {
      Alert.alert("Anime succesfully removed from favorite");
    })
    .catch((error) => {
      Alert.alert(error.message);
    });
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: undefined,
    aspectRatio: 3 / 4,
  },
  button: {
    borderRadius: 10,
    padding: 5,
    margin: 5,
    flex: 1,
    backgroundColor: "lightblue",
  },
  topicText: {
    fontFamily: "serif",
    fontSize: 20,
    fontWeight: "bold",
  },
});
