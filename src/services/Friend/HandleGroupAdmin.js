import { Alert } from "react-native";
import { firebase } from "../Firebase/Config";
import { sendPushNotification } from "../Miscellaneous/HandleNotification";

export async function promoteMemberToAdmin(groupID, memberID, app = firebase) {
  const db = app.firestore();

  const { username, notificationToken } = await db
    .collection("users")
    .doc(memberID)
    .get()
    .then((doc) => doc.data());

  const groupName = await db
    .collection("groups")
    .doc(groupID)
    .get()
    .then((doc) => doc.data().name);

  await db
    .collection("groups")
    .doc(groupID)
    .collection("admins")
    .doc(memberID)
    .set({})
    .then(() => Alert.alert("This user has been promoted to admin"))
    .then(() => {
      sendPushNotification(
        notificationToken,
        "Chattoku's Group Admin",
        `Hi ${username}, you have been promoted to admin in ${groupName}.`
      );
    })
    .catch((error) => Alert.alert("Error", error.message));
}

export async function demoteAdminToMember(groupID, adminID, app = firebase) {
  const db = app.firestore();

  const { username, notificationToken } = await db
    .collection("users")
    .doc(adminID)
    .get()
    .then((doc) => doc.data());

  const groupName = await db
    .collection("groups")
    .doc(groupID)
    .get()
    .then((doc) => doc.data().name);

  await app
    .firestore()
    .collection("groups")
    .doc(groupID)
    .collection("admins")
    .doc(adminID)
    .delete()
    .then(() => Alert.alert("This admin has been demoted"))
    .then(() => {
      sendPushNotification(
        notificationToken,
        "Chattoku's Group Admin",
        `Hi ${username}, you have been demoted to member in ${groupName}.`
      );
    })
    .catch((error) => Alert.alert("Error", error.message));
}
