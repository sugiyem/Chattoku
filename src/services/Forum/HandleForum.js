import { firebase } from "../Firebase/Config";
import { Alert } from "react-native";

export async function createForum(forumInfo, callbackSuccess) {
  const currentUID = firebase.auth().currentUser.uid;
  const db = firebase.firestore();
  const batch = db.batch();
  const newForumRef = db.collection("forums").doc();
  const forumFollowerListRef = newForumRef
    .collection("followers")
    .doc(currentUID);
  const userFollowListRef = db
    .collection("users")
    .doc(currentUID)
    .collection("follows")
    .doc(newForumRef.id);

  batch.set(newForumRef, { ...forumInfo, owner: currentUID });
  batch.set(forumFollowerListRef, { isNotificationOn: true });
  batch.set(userFollowListRef, {});

  batch
    .commit()
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

export async function getForumFollowData(forumId, callbackSuccess) {
  const currentUID = firebase.auth().currentUser.uid;

  await firebase
    .firestore()
    .collection("forums")
    .doc(forumId)
    .collection("followers")
    .doc(currentUID)
    .get()
    .then((doc) =>
      doc.exists
        ? callbackSuccess({ ...doc.data(), isFollowed: true })
        : callbackSuccess({ isFollowed: false, isNotificationOn: true })
    );
}

export async function followForum(forumId, callbackSuccess) {
  const currentUID = firebase.auth().currentUser.uid;
  const batch = firebase.firestore().batch();
  const userFollowListRef = firebase
    .firestore()
    .collection("users")
    .doc(currentUID)
    .collection("follows")
    .doc(forumId);
  const forumFollowerListRef = firebase
    .firestore()
    .collection("forums")
    .doc(forumId)
    .collection("followers")
    .doc(currentUID);

  batch.set(userFollowListRef, {});
  batch.set(forumFollowerListRef, { isNotificationOn: true });

  batch.commit().then(() => callbackSuccess());
}

export async function unfollowForum(forumId, callbackSuccess) {
  const currentUID = firebase.auth().currentUser.uid;
  const batch = firebase.firestore().batch();
  const userFollowListRef = firebase
    .firestore()
    .collection("users")
    .doc(currentUID)
    .collection("follows")
    .doc(forumId);
  const forumFollowerListRef = firebase
    .firestore()
    .collection("forums")
    .doc(forumId)
    .collection("followers")
    .doc(currentUID);

  batch.delete(userFollowListRef);
  batch.delete(forumFollowerListRef);
  batch.commit().then(() => callbackSuccess());
}

export async function updateNotification(
  forumId,
  isNotificationOn,
  callbackSuccess
) {
  const currentUID = firebase.auth().currentUser.uid;

  await firebase
    .firestore()
    .collection("forums")
    .doc(forumId)
    .collection("followers")
    .doc(currentUID)
    .set({ isNotificationOn: isNotificationOn })
    .then(() => callbackSuccess());
}
