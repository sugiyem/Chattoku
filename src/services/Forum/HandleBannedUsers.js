import { Alert } from "react-native";
import { firebase } from "../Firebase/Config";

export function getBannedUsers(forumId, callbackSuccess, app = firebase) {
  return app
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

export async function addBannedUsers(
  forumId,
  bannedUserId,
  reason,
  app = firebase
) {
  await app
    .firestore()
    .collection("forums")
    .doc(forumId)
    .collection("banned")
    .doc(bannedUserId)
    .set({ reason: reason });
}

export async function deleteBannedUsers(forumId, bannedUserId, app = firebase) {
  await app
    .firestore()
    .collection("forums")
    .doc(forumId)
    .collection("banned")
    .doc(bannedUserId)
    .delete()
    .then(() => Alert.alert("Unban Success"));
}

export function isUserBanned(forumId, userId, callbackSuccess, app = firebase) {
  return app
    .firestore()
    .collection("forums")
    .doc(forumId)
    .collection("banned")
    .doc(userId)
    .onSnapshot((doc) =>
      doc.exists
        ? callbackSuccess({ isFound: true, ...doc.data() })
        : callbackSuccess({ isFound: false })
    );
}
