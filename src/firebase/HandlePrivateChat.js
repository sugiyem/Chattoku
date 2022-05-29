import { firebase } from "./Config";

export async function sendPrivateChat(message, recipientID) {
  const userID = firebase.auth().currentUser.uid;
  const chatID =
    userID > recipientID
      ? recipientID + "_" + userID
      : userID + "_" + recipientID;

  await firebase
    .firestore()
    .collection("chatrooms")
    .doc(chatID)
    .collection("messages")
    .add({
      ...message,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
}
