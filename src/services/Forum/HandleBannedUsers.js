import { Alert } from "react-native";
import { firebase } from "../Firebase/Config";
import Warning from "../../components/Forum/Warning";

export async function getBannedUsers(forumId, callbackSuccess) {
  await firebase
    .firestore()
    .collection("forums")
    .doc(forumId)
    .collection("banned")
    .onSnapshot(
      (querySnapshot) => {
        const bannedUsers = [];
        querySnapshot.forEach((documentSnapshot) => {
          bannedUsers.push({
            ...documentSnapshot.data(),
            userId: documentSnapshot.id
          });
        });
        callbackSuccess(bannedUsers);
      },
      (error) => console.error(error)
    );
}

export async function addBannedUsers(forumId, bannedUserId, reason) {
  await firebase
    .firestore()
    .collection("forums")
    .doc(forumId)
    .collection("banned")
    .doc(bannedUserId)
    .set({ reason: reason });
}

export async function deleteBannedUsers(forumId, bannedUserId) {
  Warning(() => {
    firebase
      .firestore()
      .collection("forums")
      .doc(forumId)
      .collection("banned")
      .doc(bannedUserId)
      .delete()
      .then(() => Alert.alert("Unban Success"));
  });
}

export async function isUserBanned(forumId, userId, callbackSuccess) {
  await firebase
    .firestore()
    .collection("forums")
    .doc(forumId)
    .collection("banned")
    .doc(userId)
    .get()
    .then((doc) =>
      doc.exists
        ? callbackSuccess({ isFound: true, ...doc.data() })
        : callbackSuccess({ isFound: false })
    );
}
