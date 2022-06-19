import { Alert } from "react-native";
import { firebase } from "./Config";

export default GetUserWithUsername = async ({
  specifiedUsername,
  onFound,
  onNotFound
}) => {
  await firebase
    .firestore()
    .collection("users")
    .where("username", "==", specifiedUsername)
    .get()
    .then((querySnapshot) => {
      if (querySnapshot.size === 0) {
        onNotFound();
      } else {
        querySnapshot.forEach((documentSnapshot) => {
          onFound({ ...documentSnapshot.data(), id: documentSnapshot.id });
        });
      }
    })
    .catch((error) => {
      Alert.alert(error.message);
    });
};
