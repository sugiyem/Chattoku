import { firebase } from "../Firebase/Config";
import { Alert } from "react-native";

export async function createForum(forumInfo, callbackSuccess, app = firebase) {
  const currentUID = app.auth().currentUser.uid;
  const db = app.firestore();
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

  return newForumRef.id;
}

export async function editForum(forumInfo, callbackSuccess, app = firebase) {
  await app
    .firestore()
    .collection("forums")
    .doc(forumInfo.id)
    .set(forumInfo)
    .then(() => {
      callbackSuccess();
    })
    .catch((error) => Alert.alert(error.message));
}

export async function getForumFollowData(
  forumId,
  callbackSuccess,
  app = firebase
) {
  const currentUID = app.auth().currentUser.uid;

  await app
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

export async function followForum(forumId, callbackSuccess, app = firebase) {
  const currentUID = app.auth().currentUser.uid;
  const db = app.firestore();
  const batch = db.batch();
  const userFollowListRef = db
    .collection("users")
    .doc(currentUID)
    .collection("follows")
    .doc(forumId);
  const forumFollowerListRef = db
    .collection("forums")
    .doc(forumId)
    .collection("followers")
    .doc(currentUID);

  batch.set(userFollowListRef, {});
  batch.set(forumFollowerListRef, { isNotificationOn: true });

  batch.commit().then(() => callbackSuccess());
}

export async function unfollowForum(forumId, callbackSuccess, app = firebase) {
  const currentUID = app.auth().currentUser.uid;
  const db = app.firestore();
  const batch = db.batch();
  const userFollowListRef = db
    .collection("users")
    .doc(currentUID)
    .collection("follows")
    .doc(forumId);
  const forumFollowerListRef = db
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
  callbackSuccess,
  app = firebase
) {
  const currentUID = app.auth().currentUser.uid;

  await app
    .firestore()
    .collection("forums")
    .doc(forumId)
    .collection("followers")
    .doc(currentUID)
    .set({ isNotificationOn: isNotificationOn })
    .then(() => callbackSuccess());
}
