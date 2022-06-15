import { Alert } from "react-native";
import { firebase } from "../Firebase/Config";

export default GetUserWithUsername = async ({
  specifiedUsername,
  onFound,
  onNotFound,
  app = firebase
}) => {
  await app
    .firestore()
    .collection("users")
    .where("username", "==", specifiedUsername)
    .get()
    .then((querySnapshot) => {
      if (querySnapshot.size === 0) {
        onNotFound();
      } else {
        querySnapshot.forEach((documentSnapshot) => {
          onFound(documentSnapshot.data());
        });
      }
    })
    .catch((error) => {
      Alert.alert(error.message);
    });
};
