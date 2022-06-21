import { Alert } from "react-native";
import { firebase } from "../Firebase/Config";
import { sendPushNotification } from "../Miscellaneous/HandleNotification";

export async function addFriend(friendID, app = firebase) {
  const userID = app.auth().currentUser.uid;
  const db = app.firestore();
  const batch = db.batch();
  const userRef = db.collection("users").doc(userID);
  const friendRef = db.collection("users").doc(friendID);

  const { username: friendName, notificationToken } = await db
    .collection("users")
    .doc(friendID)
    .get()
    .then((doc) => doc.data());

  const username = await db
    .collection("users")
    .doc(userID)
    .get()
    .then((doc) => doc.data().username);

  batch.set(userRef.collection("friendRequestsSent").doc(friendID), {});
  batch.set(friendRef.collection("friendRequestsReceived").doc(userID), {});

  await batch
    .commit()
    .then(() => {
      Alert.alert("Friend request sent");
    })
    .then(() => {
      sendPushNotification(
        notificationToken,
        "Chattoku's New Friend Request",
        `Hi ${friendName}, you have a new friend request from ${username}.`
      );
    })
    .catch((error) => {
      Alert.alert("Error", error.message);
    });
}

export async function acceptFriendRequest(friendID, app = firebase) {
  const userID = app.auth().currentUser.uid;
  const db = app.firestore();
  const batch = db.batch();
  const userRef = db.collection("users").doc(userID);
  const friendRef = db.collection("users").doc(friendID);

  const { username: friendName, notificationToken } = await db
    .collection("users")
    .doc(friendID)
    .get()
    .then((doc) => doc.data());

  const username = await db
    .collection("users")
    .doc(userID)
    .get()
    .then((doc) => doc.data().username);

  batch.delete(userRef.collection("friendRequestsReceived").doc(friendID));
  batch.delete(friendRef.collection("friendRequestsSent").doc(userID));
  batch.set(userRef.collection("friends").doc(friendID), {});
  batch.set(friendRef.collection("friends").doc(userID), {});

  await batch
    .commit()
    .then(() => {
      Alert.alert("Friend request accepted");
    })
    .then(() => {
      sendPushNotification(
        notificationToken,
        "Chattoku's Friend Request Accepted",
        `Hi ${friendName}, ${username} has accepted your friend request.`
      );
    })
    .catch((error) => {
      Alert.alert("Error", error.message);
    });
}

export async function cancelFriendRequest(friendID, app = firebase) {
  const userID = app.auth().currentUser.uid;
  const db = app.firestore();
  const batch = db.batch();
  const userRef = db.collection("users").doc(userID);
  const friendRef = db.collection("users").doc(friendID);

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

export async function declineFriendRequest(friendID, app = firebase) {
  const userID = app.auth().currentUser.uid;
  const db = app.firestore();
  const batch = db.batch();
  const userRef = db.collection("users").doc(userID);
  const friendRef = db.collection("users").doc(friendID);

  const { username: friendName, notificationToken } = await db
    .collection("users")
    .doc(friendID)
    .get()
    .then((doc) => doc.data());

  const username = await db
    .collection("users")
    .doc(userID)
    .get()
    .then((doc) => doc.data().username);

  batch.delete(userRef.collection("friendRequestsReceived").doc(friendID));
  batch.delete(friendRef.collection("friendRequestsSent").doc(userID));

  await batch
    .commit()
    .then(() => {
      Alert.alert("Friend request declined");
    })
    .then(() => {
      sendPushNotification(
        notificationToken,
        "Chattoku's Friend Request Rejected",
        `Hi ${friendName}, sadly ${username} has rejected your friend request.`
      );
    })
    .catch((error) => {
      Alert.alert("Error", error.message);
    });
}

export async function removeFriend(friendID, app = firebase) {
  const userID = app.auth().currentUser.uid;
  const db = app.firestore();
  const batch = db.batch();
  const userRef = db.collection("users").doc(userID);
  const friendRef = db.collection("users").doc(friendID);

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
