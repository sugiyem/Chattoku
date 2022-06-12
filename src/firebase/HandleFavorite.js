import { Alert } from "react-native";
import { firebase } from "./Config";

export async function addAnimeToFavorite(item, app = firebase) {
  const userID = app.auth().currentUser.uid;

  await app
    .firestore()
    .collection("users")
    .doc(userID)
    .collection("anime")
    .doc(item.mal_id.toString())
    .set({
      id: item.mal_id,
      title: item.title,
      image: item.images.jpg.image_url,
      url: item.url
    })
    .then(() => {
      Alert.alert("Anime succesfully added to favorite");
    })
    .catch((error) => {
      Alert.alert(error.message);
    });
}

export async function removeAnimeFromFavorite(itemID, app = firebase) {
  const userID = app.auth().currentUser.uid;

  await app
    .firestore()
    .collection("users")
    .doc(userID)
    .collection("anime")
    .doc(itemID)
    .delete()
    .then(() => {
      Alert.alert("Anime succesfully removed from favorite");
    })
    .catch((error) => {
      Alert.alert(error.message);
    });
}

export async function addGenreToFavorite(item, app = firebase) {
  const userID = app.auth().currentUser.uid;

  await app
    .firestore()
    .collection("users")
    .doc(userID)
    .update({
      genres: app.firestore.FieldValue.arrayUnion(item)
    })
    .then(() => {
      Alert.alert("Genre succesfully added to favorite");
    })
    .catch((error) => {
      Alert.alert(error.message);
    });
}

export async function removeGenreFromFavorite(item, app = firebase) {
  const userID = app.auth().currentUser.uid;

  await app
    .firestore()
    .collection("users")
    .doc(userID)
    .update({
      genres: app.firestore.FieldValue.arrayRemove(item)
    })
    .then(() => {
      Alert.alert("Genre succesfully removed from favorite");
    })
    .catch((error) => {
      Alert.alert(error.message);
    });
}
