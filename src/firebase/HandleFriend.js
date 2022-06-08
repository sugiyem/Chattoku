import { Alert } from "react-native";
import { firebase } from "./Config";

export async function addFriend(friendID) {
  const userID = firebase.auth().currentUser.uid;
  const batch = firebase.firestore().batch();
  const userRef = firebase.firestore().collection("users").doc(userID);
  const friendRef = firebase.firestore().collection("users").doc(friendID);

  batch.set(userRef.collection("friendRequestsSent").doc(friendID), {});
  batch.set(friendRef.collection("friendRequestsReceived").doc(userID), {});

  await batch
    .commit()
    .then(() => {
      Alert.alert("Friend request sent");
    })
    .catch((error) => {
      Alert.alert("Error", error.message);
    });
}

export async function acceptFriendRequest(friendID) {
  const userID = firebase.auth().currentUser.uid;
  const batch = firebase.firestore().batch();
  const userRef = firebase.firestore().collection("users").doc(userID);
  const friendRef = firebase.firestore().collection("users").doc(friendID);

  batch.delete(userRef.collection("friendRequestsReceived").doc(friendID));
  batch.delete(friendRef.collection("friendRequestsSent").doc(userID));
  batch.set(userRef.collection("friends").doc(friendID), {});
  batch.set(friendRef.collection("friends").doc(userID), {});

  await batch
    .commit()
    .then(() => {
      Alert.alert("Friend request accepted");
    })
    .catch((error) => {
      Alert.alert("Error", error.message);
    });
}

export async function cancelFriendRequest(friendID) {
  const userID = firebase.auth().currentUser.uid;
  const batch = firebase.firestore().batch();
  const userRef = firebase.firestore().collection("users").doc(userID);
  const friendRef = firebase.firestore().collection("users").doc(friendID);

  batch.delete(userRef.collection("friendRequestsSent").doc(friendID));
  batch.delete(friendRef.collection("friendRequestsReceived").doc(userID));

  await batch
    .commit()
    .then(() => {
      Alert.alert("Friend request cancelled");
    })
    .catch((error) => {
      Alert.alert("Error", error.message);
    });
}

export async function declineFriendRequest(friendID) {
  const userID = firebase.auth().currentUser.uid;
  const batch = firebase.firestore().batch();
  const userRef = firebase.firestore().collection("users").doc(userID);
  const friendRef = firebase.firestore().collection("users").doc(friendID);

  batch.delete(userRef.collection("friendRequestsReceived").doc(friendID));
  batch.delete(friendRef.collection("friendRequestsSent").doc(userID));

  await batch
    .commit()
    .then(() => {
      Alert.alert("Friend request declined");
    })
    .catch((error) => {
      Alert.alert("Error", error.message);
    });
}

export async function removeFriend(friendID) {
  const userID = firebase.auth().currentUser.uid;
  const batch = firebase.firestore().batch();
  const userRef = firebase.firestore().collection("users").doc(userID);
  const friendRef = firebase.firestore().collection("users").doc(friendID);

  batch.delete(userRef.collection("friends").doc(friendID));
  batch.delete(friendRef.collection("friends").doc(userID));

  await batch
    .commit()
    .then(() => {
      Alert.alert("This user has been removed from your friend");
    })
    .catch((error) => {
      Alert.alert("Error", error.message);
    });
}
