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

        const promisedData = blockedUsersID.map(async (blockedID) => {
          await usersRef
            .doc(blockedID)
            .get()
            .then((doc) => {
              if (doc.exists) {
                blockedUsersData.push({
                  id: doc.id,
                  username: doc.data().username,
                  bio: doc.data().bio,
                  img: doc.data().img
                });
              }
            });
        });

        await Promise.all(promisedData).then(() => {
          // Sort blocked users by username
          blockedUsersData.sort((x, y) => (x.username < y.username ? -1 : 1));

          onSuccess(blockedUsersData);
        });
      },
      (error) => Alert.alert("Error", error.message)
    );
}
