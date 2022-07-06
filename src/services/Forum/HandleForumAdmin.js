import { firebase } from "../Firebase/Config";
import { sendPushNotification } from "../Miscellaneous/HandleNotification";

export async function addAdmin(
  forumId,
  adminDetails,
  expoPushToken,
  forumName,
  callbackSuccess
) {
  await firebase
    .firestore()
    .collection("forums")
    .doc(forumId)
    .collection("admins")
    .doc(adminDetails.uid)
    .set(adminDetails)
    .then(() => {
      sendPushNotification(
        expoPushToken,
        forumName,
        "You have been promoted to Admin"
      );
      callbackSuccess();
    });
}

export async function removeAdmin(
  forumId,
  uid,
  expoPushToken,
  forumName,
  callbackSuccess
) {
  await firebase
    .firestore()
    .collection("forums")
    .doc(forumId)
    .collection("admins")
    .doc(uid)
    .delete()
    .then(() => {
      sendPushNotification(
        expoPushToken,
        forumName,
        "You have been demoted from Admin"
      );
      callbackSuccess();
    });
}

export async function editAdminPower(
  forumId,
  uid,
  adminPowers,
  callbackSuccess
) {
  await firebase
    .firestore()
    .collection("forums")
    .doc(forumId)
    .collection("admins")
    .doc(uid)
    .set({ authorities: adminPowers }, { merge: true })
    .then(() => callbackSuccess());
}

export function getAllAdmins(forumId, callbackSuccess) {
  return firebase
    .firestore()
    .collection("forums")
    .doc(forumId)
    .collection("admins")
    .onSnapshot((querySnapshot) => {
      data = [];
      querySnapshot.forEach((doc) => data.push(doc.data()));
      callbackSuccess(data);
    });
}

export function isUserAdmin(forumId, uid, callbackSuccess) {
  return firebase
    .firestore()
    .collection("forums")
    .doc(forumId)
    .collection("admins")
    .doc(uid)
    .onSnapshot((doc) =>
      doc.exists
        ? callbackSuccess({ isFound: true, ...doc.data() })
        : callbackSuccess({ isFound: false })
    );
}

export function isAuthorizedToDeletePosts(forumId, callbackSuccess) {
  const currentUID = firebase.auth().currentUser.uid;

  return firebase
    .firestore()
    .collection("forums")
    .doc(forumId)
    .collection("admins")
    .doc(currentUID)
    .onSnapshot((doc) =>
      callbackSuccess(
        doc.exists && doc.data().authorities.includes("Delete Posts")
      )
    );
}

export function isAuthorizedToBanUsers(forumId, callbackSuccess) {
  const currentUID = firebase.auth().currentUser.uid;

  return firebase
    .firestore()
    .collection("forums")
    .doc(forumId)
    .collection("admins")
    .doc(currentUID)
    .onSnapshot((doc) =>
      callbackSuccess(
        doc.exists && doc.data().authorities.includes("Ban Users From Forum")
      )
    );
}
