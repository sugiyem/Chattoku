import { firebase } from "../Firebase/Config";

export const fetchActivePrivateChats = ({
  onSuccess,
  onFailure,
  app = firebase
}) => {
  const userID = app.auth().currentUser.uid;
  const db = app.firestore();

  return db.collection("chatrooms").onSnapshot(
    async (querySnapshot) => {
      const activeChatIDs = [];
      const activeChatDatas = [];
      const map = new Map();

      querySnapshot.forEach((documentSnapshot) => {
        const chatID = documentSnapshot.id;

        if (chatID.startsWith(userID)) {
          if (!documentSnapshot.data().showMessageToFirstUser) {
            return;
          }

          const friendID = chatID.substring(chatID.lastIndexOf("_") + 1);
          activeChatIDs.push(friendID);

          map.set(friendID, {
            showNotif: documentSnapshot.data().showNotifToFirstUser,
            lastMessageTime: documentSnapshot.data().lastMessageAt
              ? documentSnapshot.data().lastMessageAt.toDate()
              : new Date(),
            lastMessage: documentSnapshot.data().lastMessageText,
            lastSenderID: documentSnapshot.data().lastMessageSenderID
          });
        } else if (chatID.endsWith(userID)) {
          if (!documentSnapshot.data().showMessageToSecondUser) {
            return;
          }

          const friendID = chatID.substring(0, chatID.lastIndexOf("_"));
          activeChatIDs.push(friendID);

          map.set(friendID, {
            showNotif: documentSnapshot.data().showNotifToSecondUser,
            lastMessageTime: documentSnapshot.data().lastMessageAt
              ? documentSnapshot.data().lastMessageAt.toDate()
              : new Date(),
            lastMessage: documentSnapshot.data().lastMessageText,
            lastSenderID: documentSnapshot.data().lastMessageSenderID
          });
        }
      });

      const PromisedData = activeChatIDs.map(async (friendID) => {
        const { lastMessage, lastSenderID, ...remainingData } =
          map.get(friendID);

        const shownLastMessage = await getLastMessage(
          lastMessage,
          lastSenderID,
          db
        );

        await db
          .collection("users")
          .doc(friendID)
          .get()
          .then((doc) => {
            // check if user still exists
            if (doc.exists) {
              activeChatDatas.push({
                ...remainingData,
                lastMessage: shownLastMessage,
                id: friendID,
                username: doc.data().username,
                img: doc.data().img,
                bio: doc.data().bio
              });
            }
          });
      });

      await Promise.all(PromisedData).then(() =>
        onSuccess(
          activeChatDatas.sort((a, b) => b.lastMessageTime - a.lastMessageTime)
        )
      );
    },
    (error) => {
      onFailure(error);
    }
  );
};

export const fetchActiveGroupChats = ({
  onSuccess,
  onFailure,
  app = firebase
}) => {
  const userID = app.auth().currentUser.uid;
  const db = app.firestore();

  return db.collection("groups").onSnapshot(
    (querySnapshot) => {
      const activeGroupChats = [];
      let count = 0;
      console.log(querySnapshot.size);

      querySnapshot.forEach(async (documentSnapshot) => {
        const lastMessage = await getLastMessage(
          documentSnapshot.data().lastMessageText,
          documentSnapshot.data().lastMessageSenderID,
          db
        );

        await documentSnapshot.ref
          .collection("members")
          .doc(userID)
          .get()
          .then((doc) => {
            if (doc.exists && doc.data().showMessage) {
              activeGroupChats.push({
                id: documentSnapshot.id,
                name: documentSnapshot.data().name,
                img: documentSnapshot.data().img,
                description: documentSnapshot.data().description,
                lastMessage: lastMessage,
                lastMessageTime: documentSnapshot.data().lastMessageAt
                  ? documentSnapshot.data().lastMessageAt.toDate()
                  : new Date(),
                showNotif: doc.data().showNotif
              });
            }
            count = count + 1;
          })
          .then(() => {
            if (querySnapshot.size === count) {
              onSuccess(
                activeGroupChats.sort(
                  (a, b) => b.lastMessageTime - a.lastMessageTime
                )
              );
            }
          })
          .catch((error) => {
            onFailure(error);
          });
      });
    },
    (error) => {
      onFailure(error);
    }
  );
};

export const checkUnreadPrivateMessages = ({
  onFound,
  onNotFound,
  onFailure,
  app = firebase
}) => {
  const userID = app.auth().currentUser.uid;
  const db = app.firestore();

  return db.collection("chatrooms").onSnapshot(
    async (querySnapshot) => {
      let isUnreadExists = false;
      const activeChatIDs = [];

      querySnapshot.forEach((documentSnapshot) => {
        const chatID = documentSnapshot.id;

        if (
          chatID.startsWith(userID) &&
          documentSnapshot.data().showNotifToFirstUser
        ) {
          const friendID = chatID.substring(chatID.lastIndexOf("_") + 1);
          activeChatIDs.push(friendID);
        }

        if (
          chatID.endsWith(userID) &&
          documentSnapshot.data().showNotifToSecondUser
        ) {
          const friendID = chatID.substring(0, chatID.lastIndexOf("_"));
          activeChatIDs.push(friendID);
        }
      });

      const usersRef = db.collection("users");
      const promisedData = activeChatIDs.map(async (userID) => {
        await usersRef
          .doc(userID)
          .get()
          .then((doc) => {
            if (doc.exists) {
              isUnreadExists = true;
            }
          });
      });

      await Promise.all(promisedData).then(() => {
        isUnreadExists ? onFound() : onNotFound();
      });
    },
    (error) => {
      onFailure(error);
    }
  );
};

export const checkUnreadGroupMessages = ({
  onFound,
  onNotFound,
  onFailure,
  app = firebase
}) => {
  const userID = app.auth().currentUser.uid;

  return app
    .firestore()
    .collection("groups")
    .onSnapshot(
      (querySnapshot) => {
        let isUnreadExists = false;
        let count = 0;

        querySnapshot.forEach(async (documentSnapshot) => {
          await documentSnapshot.ref
            .collection("members")
            .doc(userID)
            .get()
            .then((doc) => {
              if (doc.exists && doc.data().showNotif) {
                isUnreadExists = true;
              }

              count = count + 1;
            })
            .then(() => {
              if (querySnapshot.size === count) {
                isUnreadExists ? onFound() : onNotFound();
              }
            })
            .catch((error) => {
              onFailure(error);
            });
        });
      },
      (error) => {
        onFailure(error);
      }
    );
};

async function getLastMessage(lastMessageText, senderID, db) {
  const isLastMessageAnImage = lastMessageText === "";
  let username = "";

  if (senderID) {
    username = await db
      .collection("users")
      .doc(senderID)
      .get()
      .then((doc) => {
        if (doc.exists) {
          return doc.data().username;
        } else {
          return "Deleted-Account";
        }
      });
  }

  if (isLastMessageAnImage) {
    return `${username} has sent an image`;
  } else {
    return `${username}: ${lastMessageText}`;
  }
}
