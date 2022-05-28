import { firebase } from "./Config";

export default FetchFriend = ({ onSuccesfulFetch, onFailure }) => {
  const userID = firebase.auth().currentUser.uid;

  return firebase
    .firestore()
    .collection("users")
    .doc(userID)
    .onSnapshot(
      async (documentSnapshot) => {
        const friendIDList = documentSnapshot.data().friends;
        const friendInfoList = [];

        await firebase
          .firestore()
          .collection("users")
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              if (friendIDList.includes(doc.id)) {
                friendInfoList.push(doc.data());
              }
            });
          });

        onSuccesfulFetch(friendInfoList);
      },
      (error) => {
        onFailure(error);
      }
    );
};
