import { firebase } from "../Firebase/Config";

export async function updateUserInfo({
  newData,
  onSuccess,
  onError,
  app = firebase
}) {
  const userID = app.auth().currentUser.uid;

  await app
    .firestore()
    .collection("users")
    .doc(userID)
    .update({
      username: newData.username,
      bio: newData.bio,
      img: newData.img
    })
    .then(onSuccess)
    .catch(onError);
}
