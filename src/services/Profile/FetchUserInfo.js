import { firebase } from "../Firebase/Config";
import { Alert } from "react-native";

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

export function getCurrentUID() {
  return firebase.auth().currentUser.uid;
}

export function FetchAllUserInfos(onSuccess, app = firebase) {
  return app
    .firestore()
    .collection("users")
    .onSnapshot(
      (querySnapshot) => {
        const userDatas = [];

        querySnapshot.forEach((documentSnapshot) => {
          userDatas.push({
            id: documentSnapshot.id,
            username: documentSnapshot.data().username,
            bio: documentSnapshot.data().bio,
            img: documentSnapshot.data().img
          });
        });

        onSuccess(userDatas);
      },
      (error) => Alert.alert("Error", error.message)
    );
}

export async function FetchInfoById(userID, callbackSuccess, app = firebase) {
  await app
    .firestore()
    .collection("users")
    .doc(userID)
    .get()
    .then((documentSnapshot) => {
      if (!documentSnapshot.exists) {
        callbackSuccess({ isDeleted: true });
        return;
      }
      const doc = documentSnapshot.data();
      callbackSuccess(doc);
    })
    .catch((e) => console.error(e));
}

export async function fetchFavoriteAnimeById(
  userID,
  onSuccess,
  app = firebase
) {
  await app
    .firestore()
    .collection("users")
    .doc(userID)
    .collection("anime")
    .get()
    .then((querySnapshot) => {
      const animeData = [];
      querySnapshot.forEach((documentSnapshot) => {
        animeData.push(documentSnapshot.data());
      });
      onSuccess(animeData);
    })
    .catch((error) => Alert.alert("Error", error.message));
}
