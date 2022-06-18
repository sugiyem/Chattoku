import { firebase } from "../Firebase/Config";

export async function sendPrivateChat(message, recipientID, app = firebase) {
  const userID = app.auth().currentUser.uid;
  const chatID =
    userID > recipientID
      ? recipientID + "_" + userID
      : userID + "_" + recipientID;

  await app
    .firestore()
    .collection("chatrooms")
    .doc(chatID)
    .collection("messages")
    .add({
      ...message,
      createdAt: app.firestore.FieldValue.serverTimestamp()
    });
}

export async function sendGroupChat(message, groupID, app = firebase) {
  await app
    .firestore()
    .collection("groups")
    .doc(groupID)
    .collection("messages")
    .add({
      ...message,
      createdAt: app.firestore.FieldValue.serverTimestamp()
    });
}
