import { firebase } from "./Config";

export default FetchGroupChat = ({ groupID, onSuccess, onFailure }) => {
  return firebase
    .firestore()
    .collection("groups")
    .doc(groupID)
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

        onSuccess(messageLists);
      },
      (error) => {
        onFailure(error);
      }
    );
};
