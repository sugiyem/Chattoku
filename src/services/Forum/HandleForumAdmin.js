import { firebase } from "../Firebase/Config";

export async function addAdmin(forumId, adminDetails, callbackSuccess) {
  await firebase
    .firestore()
    .collection("forums")
    .doc(forumId)
    .collection("admins")
    .doc(adminDetails.uid)
    .set(adminDetails)
    .then(() => callbackSuccess());
}

export async function removeAdmin(forumId, uid, callbackSuccess) {
  await firebase
    .firestore()
    .collection("forums")
    .doc(forumId)
    .collection("admins")
    .doc(uid)
    .delete()
    .then(() => callbackSuccess());
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
