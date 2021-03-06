import { Alert } from "react-native";
import { firebase } from "../Firebase/Config";

export function fetchGroupAdminIDs({ groupID, onSuccess, app = firebase }) {
  return app
    .firestore()
    .collection("groups")
    .doc(groupID)
    .collection("admins")
    .onSnapshot(
      (querySnapshot) => {
        const adminIDs = [];

        querySnapshot.forEach((documentSnapshot) => {
          adminIDs.push(documentSnapshot.id);
        });

        onSuccess(adminIDs);
      },
      (error) => Alert.alert("Error", error.message)
    );
}

export function checkIfUserIsGroupAdmin({
  groupID,
  onTrue,
  onFalse,
  app = firebase
}) {
  const userID = app.auth().currentUser.uid;

  return app
    .firestore()
    .collection("groups")
    .doc(groupID)
    .collection("admins")
    .onSnapshot(
      (querySnapshot) => {
        const adminIDs = [];
        querySnapshot.forEach((documentSnapshot) => {
          adminIDs.push(documentSnapshot.id);
        });

        if (adminIDs.includes(userID)) {
          onTrue();
        } else {
          onFalse();
        }
      },
      (error) => Alert.alert("Error", error.message)
    );
}

export async function checkIfUserIsGroupOwner({
  groupID,
  onTrue,
  onFalse,
  app = firebase
}) {
  const userID = app.auth().currentUser.uid;

  app
    .firestore()
    .collection("groups")
    .doc(groupID)
    .get()
    .then((doc) => {
      doc.data().owner === userID ? onTrue() : onFalse();
    })
    .catch((error) => Alert.alert("Error", error.message));
}
