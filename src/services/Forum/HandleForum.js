import { firebase } from "../Firebase/Config";
import { Alert } from "react-native";

export async function createForum(forumInfo, callbackSuccess) {
  const currentUID = firebase.auth().currentUser.uid;

  await firebase
    .firestore()
    .collection("forums")
    .add({
      ...forumInfo,
      owner: currentUID
    })
    .then(() => {
      callbackSuccess();
    })
    .catch((error) => Alert.alert(error.message));
}

export async function editForum(forumInfo, callbackSuccess) {
  await firebase
    .firestore()
    .collection("forums")
    .doc(forumInfo.id)
    .set(forumInfo)
    .then(() => {
      callbackSuccess();
    })
    .catch((error) => Alert.alert(error.message));
}

export async function IsForumFollowed(forumId, callbackSuccess) {
  const currentUID = firebase.auth().currentUser.uid;

  await firebase
    .firestore()
    .collection("users")
    .doc(currentUID)
    .collection("follows")
    .doc(forumId)
    .get()
    .then((doc) => callbackSuccess(doc.exists));
}

export async function UpdateFollowForumStatus(
  forumId,
  isFollowed,
  callbackSuccess
) {
  const currentUID = firebase.auth().currentUser.uid;
  const FollowedRef = firebase
    .firestore()
    .collection("users")
    .doc(currentUID)
    .collection("follows")
    .doc(forumId);

  if (isFollowed) {
    FollowedRef.set({}).then(() => callbackSuccess());
  } else {
    FollowedRef.delete().then(() => callbackSuccess());
  }
}
