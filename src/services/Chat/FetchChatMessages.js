import { firebase } from "../Firebase/Config";

export const fetchPrivateChatMessages = ({
  recipientID,
  onSuccesfulFetch,
  onFailure,
  app = firebase
}) => {
  const userID = app.auth().currentUser.uid;
  const chatID =
    userID > recipientID
      ? recipientID + "_" + userID
      : userID + "_" + recipientID;

  return app
    .firestore()
    .collection("chatrooms")
    .doc(chatID)
    .collection("messages")
    .orderBy("createdAt", "desc")
    .onSnapshot(
      async (querySnapshot) => {
        const messageLists = [];

        if (userID > recipientID) {
          await app.firestore().collection("chatrooms").doc(chatID).set(
            {
              showNotifToSecondUser: false
            },
            { merge: true }
          );
        } else {
          await app.firestore().collection("chatrooms").doc(chatID).set(
            {
              showNotifToFirstUser: false
            },
            { merge: true }
          );
        }

        querySnapshot.forEach((documentSnapshot) => {
          const doc = documentSnapshot.data();

          if (doc.createdAt) {
            messageLists.push({
              ...doc,
              createdAt: doc.createdAt.toDate()
            });
          } else {
            messageLists.push({
              ...doc,
              createdAt: new Date()
            });
          }
        });

        onSuccesfulFetch(messageLists);
      },
      (error) => {
        onFailure(error);
      }
    );
};

export const fetchGroupChatMessages = ({
  groupID,
  onSuccess,
  onFailure,
  app = firebase
}) => {
  const userID = app.auth().currentUser.uid;
  const groupRef = app.firestore().collection("groups").doc(groupID);
  const currentTime = app.firestore.FieldValue.serverTimestamp();

  return groupRef
    .collection("messages")
    .orderBy("createdAt", "desc")
    .onSnapshot(
      async (querySnapshot) => {
        const messageLists = [];
        const batch = app.firestore().batch();

        /*
        await groupRef.collection("members").doc(userID).update({
          showNotif: false
        });
        */

        batch.update(groupRef, { lastAccessedAt: currentTime });
        batch.update(groupRef.collection("members").doc(userID), {
          showNotif: false
        });

        await batch.commit();

        querySnapshot.forEach((documentSnapshot) => {
          const doc = documentSnapshot.data();

          if (doc.createdAt) {
            messageLists.push({
              ...doc,
              createdAt: doc.createdAt.toDate()
            });
          } else {
            messageLists.push({
              ...doc,
              createdAt: new Date()
            });
          }
        });

        onSuccess(messageLists);
      },
      (error) => {
        onFailure(error);
      }
    );
};
