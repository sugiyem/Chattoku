import { Alert } from "react-native";
import { firebase } from "./Config";

export async function addFriend(friendID) {
  const userID = firebase.auth().currentUser.uid;
  const userRef = firebase.firestore().collection("users").doc(userID);
  const friendRef = firebase.firestore().collection("users").doc(friendID);

  await userRef
    .collection("friendRequestsSent")
    .doc(friendID)
    .set({})
    .then(async () => {
      await friendRef.collection("friendRequestsReceived").doc(userID).set({});
    })
    .then(() => {
      Alert.alert("Friend request sent");
    })
    .catch((error) => {
      Alert.alert("Error", error.message);
    });
}

export async function acceptFriendRequest(friendID) {
  const userID = firebase.auth().currentUser.uid;
  const userRef = firebase.firestore().collection("users").doc(userID);
  const friendRef = firebase.firestore().collection("users").doc(friendID);

  await userRef
    .collection("friendRequestsReceived")
    .doc(friendID)
    .delete()
    .then(async () => {
      await userRef.collection("friends").doc(friendID).set({});
    })
    .then(async () => {
      await friendRef.collection("friendRequestsSent").doc(userID).delete();
    })
    .then(async () => {
      await friendRef.collection("friends").doc(userID).set({});
    })
    .then(() => {
      Alert.alert("Friend request accepted");
    })
    .catch((error) => {
      Alert.alert("Error", error.message);
    });
}

export async function cancelFriendRequest(friendID) {
  const userID = firebase.auth().currentUser.uid;
  const userRef = firebase.firestore().collection("users").doc(userID);
  const friendRef = firebase.firestore().collection("users").doc(friendID);

  await userRef
    .collection("friendRequestsSent")
    .doc(friendID)
    .delete()
    .then(async () => {
      await friendRef.collection("friendRequestsReceived").doc(userID).delete();
    })
    .then(() => {
      Alert.alert("Friend request cancelled");
    })
    .catch((error) => {
      Alert.alert("Error", error.message);
    });
}

export async function declineFriendRequest(friendID) {
  const userID = firebase.auth().currentUser.uid;
  const userRef = firebase.firestore().collection("users").doc(userID);
  const friendRef = firebase.firestore().collection("users").doc(friendID);

  await userRef
    .collection("friendRequestsReceived")
    .doc(friendID)
    .delete()
    .then(async () => {
      await friendRef.collection("friendRequestsSent").doc(userID).delete();
    })
    .then(() => {
      Alert.alert("Friend request declined");
    })
    .catch((error) => {
      Alert.alert("Error", error.message);
    });
}

export async function removeFriend(friendID) {
  const userID = firebase.auth().currentUser.uid;
  const userRef = firebase.firestore().collection("users").doc(userID);
  const friendRef = firebase.firestore().collection("users").doc(friendID);

  await userRef
    .collection("friends")
    .doc(friendID)
    .delete()
    .then(async () => {
      await friendRef.collection("friends").doc(userID).delete();
    })
    .then(() => {
      Alert.alert("This user has been removed from your friend");
    })
    .catch((error) => {
      Alert.alert("Error", error.message);
    });
}
