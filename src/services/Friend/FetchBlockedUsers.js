import { firebase } from "../Firebase/Config";
import { Alert } from "react-native";

export function fetchBlockedUsers(onSuccess, app = firebase) {
  const userID = app.auth().currentUser.uid;
  const usersRef = app.firestore().collection("users");

  return usersRef
    .doc(userID)
    .collection("blockedUsers")
    .onSnapshot(
      async (querySnapshot) => {
        const blockedUsersID = [];
        const blockedUsersData = [];

        querySnapshot.forEach((documentSnapshot) => {
          blockedUsersID.push(documentSnapshot.id);
        });

        await usersRef.get().then((snaps) => {
          snaps.forEach((snap) => {
            if (blockedUsersID.includes(snap.id)) {
              blockedUsersData.push({
                id: snap.id,
                username: snap.data().username,
                bio: snap.data().bio,
                img: snap.data().img
              });
            }
          });
        });

        onSuccess(blockedUsersData);
      },
      (error) => Alert.alert("Error", error.message)
    );
}
