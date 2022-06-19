import { firebase } from "../../../firebase/Config.js";
import { FetchInfoById } from "../../../firebase/FetchUserInfo.js";

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

export async function addBannedUsers(forumId, bannedUserId) {
  await firebase
    .firestore()
    .collection("forums")
    .doc(forumId)
    .collection("banned")
    .doc(bannedUserId)
    .set({});
}

export async function deleteBannedUsers(forumId, bannedUserId) {
  await firebase
    .firestore()
    .collection("forums")
    .doc(forumId)
    .collection("banned")
    .doc(bannedUserId)
    .delete();
}
