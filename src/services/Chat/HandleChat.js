import { firebase } from "../Firebase/Config";

export async function sendPrivateChat(message, recipientID, app = firebase) {
  const userID = app.auth().currentUser.uid;
  const chatID =
    userID > recipientID
      ? recipientID + "_" + userID
      : userID + "_" + recipientID;
  const batch = app.firestore().batch();
  const sentTime = app.firestore.FieldValue.serverTimestamp();
  const chatRoomRef = app.firestore().collection("chatrooms").doc(chatID);
  const newMessageID = chatRoomRef.collection("messages").doc().id;

  batch.set(chatRoomRef.collection("messages").doc(newMessageID), {
    ...message,
    createdAt: sentTime
  });

  if (userID > recipientID) {
    batch.set(
      chatRoomRef,
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
    batch.set(
      chatRoomRef,
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

  await batch.commit();
}

export async function sendGroupChat(message, groupID, app = firebase) {
  const userID = app.auth().currentUser.uid;
  const batch = app.firestore().batch();
  const sentTime = app.firestore.FieldValue.serverTimestamp();
  const groupRef = app.firestore().collection("groups").doc(groupID);
  const newMessageID = groupRef.collection("messages").doc().id;
  const membersSnapshot = await groupRef.collection("members").get();

  batch.update(groupRef, {
    lastAccessedAt: sentTime,
    lastMessageAt: sentTime,
    lastMessageText: message.text
  });

  batch.set(groupRef.collection("messages").doc(newMessageID), {
    ...message,
    createdAt: sentTime
  });

  membersSnapshot.docs.forEach((doc) => {
    if (doc.id != userID) {
      batch.set(doc.ref, { showMessage: true, showNotif: true });
    } else {
      batch.set(doc.ref, { showMessage: true }, { merge: true });
    }
  });

  await batch.commit();
}

export async function removePrivateChat(item, app = firebase) {
  const userID = app.auth().currentUser.uid;
  let chatID = "";

  if (userID > item.id) {
    chatID = item.id + "_" + userID;
    await app.firestore().collection("chatrooms").doc(chatID).update({
      showMessageToSecondUser: false
    });
  } else {
    chatID = userID + "_" + item.id;
    await app.firestore().collection("chatrooms").doc(chatID).update({
      showMessageToFirstUser: false
    });
  }
}

export async function removeGroupChat(item, app = firebase) {
  const userID = app.auth().currentUser.uid;
  const groupID = item.id;
  const batch = app.firestore().batch();
  const groupRef = app.firestore().collection("groups").doc(groupID);
  const currentTime = app.firestore.FieldValue.serverTimestamp();

  batch.update(groupRef, { lastAccessedAt: currentTime });
  batch.update(groupRef.collection("members").doc(userID), {
    showMessage: false
  });

  await batch.commit();
}
