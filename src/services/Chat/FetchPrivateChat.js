import { firebase } from "../Firebase/Config";

export default FetchPrivateChat = ({
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
      (querySnapshot) => {
        const messageLists = [];
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
