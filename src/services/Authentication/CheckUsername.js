import { Alert } from "react-native";
import { firebase } from "../Firebase/Config";

//check is a username is alphanumeric and contains at
//least one char
export function isValidUsername(username) {
  const regex = /^\s*([0-9a-zA-Z]+)\s*$/;
  return regex.test(username);
}

export async function isUsernameTaken(username, app = firebase) {
  const listOfUsernames = [];
  await app
    .firestore()
    .collection("users")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((documentSnapshot) => {
        listOfUsernames.push(documentSnapshot.data().username);
      });
    })
    .catch((error) => {
      Alert.alert(error.message);
    });
  return listOfUsernames.includes(username);
}
