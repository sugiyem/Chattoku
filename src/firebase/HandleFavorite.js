import { Alert } from "react-native";
import { firebase } from "./Config";

export async function addAnimeToFavorite(item) {
  const userID = firebase.auth().currentUser.uid;

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
    })
    .then(() => {
      Alert.alert("Anime succesfully added to favorite");
    })
    .catch((error) => {
      Alert.alert(error.message);
    });
}

export async function removeAnimeFromFavorite(itemID) {
  const userID = firebase.auth().currentUser.uid;

  await firebase
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

export async function addGenreToFavorite(item) {
  const userID = firebase.auth().currentUser.uid;

  await firebase
    .firestore()
    .collection("users")
    .doc(userID)
    .update({
      genres: firebase.firestore.FieldValue.arrayUnion(item),
    })
    .then(() => {
      Alert.alert("Genre succesfully added to favorite");
    })
    .catch((error) => {
      Alert.alert(error.message);
    });
}

export async function removeGenreFromFavorite(item) {
  const userID = firebase.auth().currentUser.uid;

  await firebase
    .firestore()
    .collection("users")
    .doc(userID)
    .update({
      genres: firebase.firestore.FieldValue.arrayRemove(item),
    })
    .then(() => {
      Alert.alert("Genre succesfully removed from favorite");
    })
    .catch((error) => {
      Alert.alert(error.message);
    });
}
