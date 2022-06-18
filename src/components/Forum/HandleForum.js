import { firebase } from "../../firebase/Config";
import { Alert } from "react-native";

export async function createForum(forumInfo, callbackSuccess) {
  const currentUID = firebase.auth().currentUser.uid;

  await firebase
    .firestore()
    .collection("forums")
    .add({
      ...forumInfo,
      owner: currentUID
    })
    .then(() => {
      callbackSuccess();
    })
    .catch((error) => Alert.alert(error.message));
}

export async function editForum(forumInfo, callbackSuccess) {
  await firebase
    .firestore()
    .collection("forums")
    .doc(forumInfo.id)
    .set(forumInfo)
    .then(() => {
      callbackSuccess();
    })
    .catch((error) => Alert.alert(error.message));
}
