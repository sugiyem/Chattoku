import { firebase } from "../Firebase/Config";
import {
  sendPushNotification,
  sendNotificationToAllGroupMembers
} from "../Miscellaneous/HandleNotification";

export async function sendPrivateChat(message, recipientID, app = firebase) {
  const userID = app.auth().currentUser.uid;
  const chatID =
    userID > recipientID
      ? recipientID + "_" + userID
      : userID + "_" + recipientID;
  const db = app.firestore();
  const batch = db.batch();
  const sentTime = app.firestore.FieldValue.serverTimestamp();
  const chatRoomRef = db.collection("chatrooms").doc(chatID);
  const newMessageID = chatRoomRef.collection("messages").doc().id;

  const { username: friendName, notificationToken } = await db
    .collection("users")
    .doc(recipientID)
    .get()
    .then((doc) => doc.data());

  const username = await db
    .collection("users")
    .doc(userID)
    .get()
    .then((doc) => doc.data().username);

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

  await batch.commit().then(() => {
    sendPushNotification(
      notificationToken,
      "Chattoku's Private Chat",
      `Hi ${friendName}, you have a new private message from ${username}.`
    );
  });

  return { messageID: newMessageID, time: sentTime };
}

export async function sendGroupChat(message, groupID, app = firebase) {
  const userID = app.auth().currentUser.uid;
  const db = app.firestore();
  const batch = db.batch();
  const sentTime = app.firestore.FieldValue.serverTimestamp();
  const groupRef = db.collection("groups").doc(groupID);
  const newMessageID = groupRef.collection("messages").doc().id;
  const membersSnapshot = await groupRef.collection("members").get();

  const groupName = await db
    .collection("groups")
    .doc(groupID)
    .get()
    .then((doc) => doc.data().name);

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
      batch.update(doc.ref, { showMessage: true });
    }
  });

  await batch.commit().then(async () => {
    await sendNotificationToAllGroupMembers(
      groupID,
      userID,
      "Chattoku's Group Chat",
      `There is a new message in ${groupName} group.`,
      db
    );
  });

  return { messageID: newMessageID, time: sentTime };
}

export async function removePrivateChat(friendID, app = firebase) {
  const userID = app.auth().currentUser.uid;
  let chatID = "";

  if (userID > friendID) {
    chatID = friendID + "_" + userID;
    await app.firestore().collection("chatrooms").doc(chatID).update({
      showMessageToSecondUser: false
    });
  } else {
    chatID = userID + "_" + friendID;
    await app.firestore().collection("chatrooms").doc(chatID).update({
      showMessageToFirstUser: false
    });
  }
}

export async function removeGroupChat(groupID, app = firebase) {
  const userID = app.auth().currentUser.uid;
  const batch = app.firestore().batch();
  const groupRef = app.firestore().collection("groups").doc(groupID);
  const currentTime = app.firestore.FieldValue.serverTimestamp();

  batch.update(groupRef, { lastAccessedAt: currentTime });
  batch.update(groupRef.collection("members").doc(userID), {
    showMessage: false
  });

  await batch.commit();

  return currentTime;
}
