import { Alert } from "react-native";
import { firebase } from "../Firebase/Config";

export async function blockUser(userID, app = firebase) {
  const currentUserID = app.auth().currentUser.uid;
  const db = app.firestore();
  const batch = db.batch();
  const currentUserRef = db.collection("users").doc(currentUserID);
  const otherUserRef = db.collection("users").doc(userID);

  // unfriend user if it is a friend
  batch.delete(currentUserRef.collection("friends").doc(userID));
  batch.delete(otherUserRef.collection("friends").doc(currentUserID));

  // delete friend request received if it exists
  batch.delete(currentUserRef.collection("friendRequestsReceived").doc(userID));
  batch.delete(
    otherUserRef.collection("friendRequestsSent").doc(currentUserID)
  );

  // delete friend request sent if it exists
  batch.delete(currentUserRef.collection("friendRequestsSent").doc(userID));
  batch.delete(
    otherUserRef.collection("friendRequestsReceived").doc(currentUserID)
  );

  batch.set(currentUserRef.collection("blockedUsers").doc(userID), {});

  await batch
    .commit()
    .then(() => Alert.alert("This user has been blocked"))
    .catch((error) => Alert.alert("Error", error.message));
}

export async function unblockUser(userID, app = firebase) {
  const currentUserID = app.auth().currentUser.uid;

  await app
    .firestore()
    .collection("users")
    .doc(currentUserID)
    .collection("blockedUsers")
    .doc(userID)
    .delete()
    .then(() => Alert.alert("This user has been unblocked"))
    .catch((error) => Alert.alert("Error", error.message));
}

export function isBlockedByCurrentUser(
  userID,
  onTrue,
  onFalse,
  app = firebase
) {
  const currentUserID = app.auth().currentUser.uid;

  return app
    .firestore()
    .collection("users")
    .doc(currentUserID)
    .collection("blockedUsers")
    .doc(userID)
    .onSnapshot(
      (documentSnapshot) => {
        documentSnapshot.exists ? onTrue() : onFalse();
      },
      (error) => Alert.alert("Error", error.message)
    );
}

export function isCurrentUserBlocked(userID, onTrue, onFalse, app = firebase) {
  const currentUserID = app.auth().currentUser.uid;

  return app
    .firestore()
    .collection("users")
    .doc(userID)
    .collection("blockedUsers")
    .doc(currentUserID)
    .onSnapshot(
      (documentSnapshot) => {
        documentSnapshot.exists ? onTrue() : onFalse();
      },
      (error) => Alert.alert("Error", error.message)
    );
}
