import { firebase } from "../Firebase/Config";

export default FetchUserInfo = ({
  onSuccesfulFetch,
  onFailure,
  app = firebase
}) => {
  const userID = app.auth().currentUser.uid;

  return app
    .firestore()
    .collection("users")
    .doc(userID)
    .onSnapshot(
      (documentSnapshot) => {
        const doc = documentSnapshot.data();
        onSuccesfulFetch(doc);
      },
      (error) => {
        onFailure(error);
      }
    );
};
