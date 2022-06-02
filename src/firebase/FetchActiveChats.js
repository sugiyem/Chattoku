import { firebase } from "./Config";

export default FetchActiveChats = ({ onSuccess, onFailure }) => {
  const userID = firebase.auth().currentUser.uid;

  return firebase
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

        await firebase
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
      (error) => onFailure("Error", error.message)
    );
};
