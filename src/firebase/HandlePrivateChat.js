import { firebase } from "./Config";

export async function sendPrivateChat(message, recipientID) {
  const userID = firebase.auth().currentUser.uid;
  const chatID =
    userID > recipientID
      ? recipientID + "_" + userID
      : userID + "_" + recipientID;
  const sentTime = firebase.firestore.FieldValue.serverTimestamp();

  await firebase
    .firestore()
    .collection("chatrooms")
    .doc(chatID)
    .collection("messages")
    .add({
      ...message,
      createdAt: sentTime
    });

  if (userID > recipientID) {
    await firebase.firestore().collection("chatrooms").doc(chatID).set(
      {
        showMessageToFirstUser: true,
        showMessageToSecondUser: true,
        showNotifToFirstUser: true,
        lastMessageAt: sentTime,
        lastMessageText: message.text
      },
      { merge: true }
    );
  } else {
    await firebase.firestore().collection("chatrooms").doc(chatID).set(
      {
        showMessageToFirstUser: true,
        showMessageToSecondUser: true,
        showNotifToSecondUser: true,
        lastMessageAt: sentTime,
        lastMessageText: message.text
      },
      { merge: true }
    );
  }
}

export async function removeChat(item) {
  const userID = firebase.auth().currentUser.uid;
  var chatID = "";

  if (userID > item.id) {
    chatID = item.id + "_" + userID;
    await firebase.firestore().collection("chatrooms").doc(chatID).update({
      showMessageToSecondUser: false
    });
  } else {
    chatID = userID + "_" + item.id;
    await firebase.firestore().collection("chatrooms").doc(chatID).update({
      showMessageToFirstUser: false
    });
  }
}
