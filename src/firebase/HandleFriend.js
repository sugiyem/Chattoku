import { Alert } from "react-native";
import { firebase } from "./Config";

export async function addFriend(friendID) {
  const userID = firebase.auth().currentUser.uid;

  await firebase
    .firestore()
    .collection("users")
    .doc(userID)
    .update({
      friends: firebase.firestore.FieldValue.arrayUnion(friendID),
    })
    .then(() => {
      Alert.alert("This user has been added as a friend");
    })
    .catch((error) => {
      Alert.alert(error.message);
    });
}

export async function removeFriend(friendID) {
  const userID = firebase.auth().currentUser.uid;

  await firebase
    .firestore()
    .collection("users")
    .doc(userID)
    .update({
      friends: firebase.firestore.FieldValue.arrayRemove(friendID),
    })
    .then(() => {
      Alert.alert("This user has been removed from your friends");
    })
    .catch((error) => {
      Alert.alert(error.message);
    });
}
