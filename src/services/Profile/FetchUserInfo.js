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

export async function FetchInfoById(userID, callbackSuccess) {
  return firebase
    .firestore()
    .collection("users")
    .doc(userID)
    .get()
    .then((documentSnapshot) => {
      const doc = documentSnapshot.data();
      callbackSuccess(doc);
    })
    .catch((e) => console.error(e));
}
