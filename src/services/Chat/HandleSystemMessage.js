import { firebase } from "../Firebase/Config";

export async function sendSystemMessageToUser(
  messageText,
  recipientID,
  app = firebase
) {
  const userID = app.auth().currentUser.uid;
  const chatID =
    userID > recipientID
      ? recipientID + "_" + userID
      : userID + "_" + recipientID;
  const messagesRef = app
    .firestore()
    .collection("chatRooms")
    .doc(chatID)
    .collection("messages");
  const systemMessageID = messagesRef.doc().id;
  const sentTime = app.firestore.FieldValue.serverTimestamp();

  await messagesRef.doc(systemMessageID).set({
    _id: systemMessageID,
    text: messageText,
    createdAt: sentTime,
    system: true
  });
}

export async function sendSystemMessageToGroup(
  messageText,
  groupID,
  app = firebase
) {
  const messagesRef = app
    .firestore()
    .collection("groups")
    .doc(groupID)
    .collection("messages");
  const systemMessageID = messagesRef.doc().id;
  const sentTime = app.firestore.FieldValue.serverTimestamp();

  await messagesRef.doc(systemMessageID).set({
    _id: systemMessageID,
    text: messageText,
    createdAt: sentTime,
    system: true
  });
}
