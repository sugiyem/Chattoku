import { firebase } from "../Firebase/Config";

export const fetchActivePrivateChats = ({
  onSuccess,
  onFailure,
  app = firebase
}) => {
  const userID = app.auth().currentUser.uid;

  return app
    .firestore()
    .collection("chatrooms")
    .onSnapshot(
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
              lastMessage: documentSnapshot.data().lastMessageText
                ? documentSnapshot.data().lastMessageText
                : ""
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
              lastMessage: documentSnapshot.data().lastMessageText
                ? documentSnapshot.data().lastMessageText
                : ""
            });
          }
        });

        await app
          .firestore()
          .collection("users")
          .get()
          .then((snaps) => {
            snaps.forEach((snap) => {
              if (activeChatIDs.includes(snap.id)) {
                activeChatDatas.push({
                  ...map.get(snap.id),
                  id: snap.id,
                  username: snap.data().username,
                  img: snap.data().img
                });
              }
            });
          })
          .catch((error) => alert(error));

        onSuccess(
          activeChatDatas.sort((a, b) => b.lastMessageTime - a.lastMessageTime)
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

  return app
    .firestore()
    .collection("groups")
    .onSnapshot(
      (querySnapshot) => {
        const activeGroupChats = [];
        let count = 0;
        console.log(querySnapshot.size);

        querySnapshot.forEach(async (documentSnapshot) => {
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
                  lastMessage: documentSnapshot.data().lastMessageText,
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

  return app
    .firestore()
    .collection("chatrooms")
    .onSnapshot(
      async (querySnapshot) => {
        let isUnreadExists = false;

        querySnapshot.forEach((documentSnapshot) => {
          const chatID = documentSnapshot.id;

          if (
            chatID.startsWith(userID) &&
            documentSnapshot.data().showNotifToFirstUser
          ) {
            isUnreadExists = true;
          }

          if (
            chatID.endsWith(userID) &&
            documentSnapshot.data().showNotifToSecondUser
          ) {
            isUnreadExists = true;
          }
        });

        if (isUnreadExists) {
          onFound();
        } else {
          onNotFound();
        }
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
