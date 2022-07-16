import { result } from "lodash";
import { Alert } from "react-native";
import { firebase } from "../Firebase/Config";
import { FetchInfoById } from "../Profile/FetchUserInfo";

export function getBannedUsers(forumId, callbackSuccess) {
  return firebase
    .firestore()
    .collection("forums")
    .doc(forumId)
    .collection("banned")
    .onSnapshot(
      async (querySnapshot) => {
        let bannedUsers = [];
        querySnapshot.forEach((documentSnapshot) => {
          bannedUsers.push({
            ...documentSnapshot.data(),
            userId: documentSnapshot.id
          });
        });

        const deleted = [];

        const existencePromise = bannedUsers.map((banned, i) =>
          FetchInfoById(banned.userId, (result) => {
            deleted[i] = result.isDeleted;
          })
        );

        await Promise.all(existencePromise);

        bannedUsers = bannedUsers.filter((_, i) => !deleted[i]);

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
  await firebase
    .firestore()
    .collection("forums")
    .doc(forumId)
    .collection("banned")
    .doc(bannedUserId)
    .delete()
    .then(() => Alert.alert("Unban Success"));
}

export function isUserBanned(forumId, userId, callbackSuccess) {
  return firebase
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
