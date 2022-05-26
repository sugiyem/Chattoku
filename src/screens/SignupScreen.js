import {
  StyleSheet,
  SafeAreaView,
  TextInput,
  Button,
  Text,
  Alert,
} from "react-native";
import { useState } from "react";
import React from "react";
import { firebase } from "../firebase/Config";
import { isUsernameTaken, isValidUsername } from "../firebase/CheckUsername";

const initialState = {
  username: "",
  email: "",
  password: "",
  confirmPass: "",
};

const SignupScreen = ({ navigation }) => {
  const [credentials, setCredentials] = useState(initialState);

  function handleChangeText(text, name) {
    setCredentials({
      ...credentials,
      [name]: text,
    });
  }

  console.log(credentials);

  async function handleSubmit() {
    console.log("clicked");
    const isUsernameNotAvailable = await isUsernameTaken(credentials.username);

    if (!isValidUsername(credentials.username)) {
      Alert.alert(
        "username must only contains alphanumeric characters and must at least be 1 character long"
      );
    } else if (isUsernameNotAvailable) {
      Alert.alert("username is not available");
    } else if (!isValidEmail(credentials.email)) {
      Alert.alert("email is not valid!");
    } else if (credentials.password !== credentials.confirmPass) {
      Alert.alert("password doesn't match");
    } else if (isPasswordTooShort(credentials.password)) {
      Alert.alert("password must at least be 6 characters long");
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(credentials.email, credentials.password)
        .then(async (response) => {
          response.user.sendEmailVerification();

          const currentUID = firebase.auth().currentUser.uid;

          await firebase.firestore().collection("users").doc(currentUID).set({
            username: credentials.username,
            bio: "",
            img: "",
            genres: [],
          });

          Alert.alert(
            "Email sent.",
            "Please verify your account before signing in."
          );
          firebase.auth().signOut();
          console.log("finished");
        })
        .then(() => {
          redirectToLoginScreen(navigation);
        })
        .catch((e) => {
          Alert.alert("email is already taken");
          console.log("email already taken");
        });
    }
  }

  return (
    <SafeAreaView style={styles.Container}>
      <Text> Sign Up </Text>
      <Text> username </Text>
      <TextInput
        placeholder="username"
        value={credentials.username}
        onChangeText={(text) => handleChangeText(text, "username")}
      />
      <Text> email </Text>
      <TextInput
        placeholder="email"
        value={credentials.email}
        onChangeText={(text) => handleChangeText(text, "email")}
      />
      <Text> password </Text>
      <TextInput
        placeholder="password"
        secureTextEntry={true}
        value={credentials.password}
        onChangeText={(text) => handleChangeText(text, "password")}
      />
      <Text> confirm password</Text>
      <TextInput
        placeholder="confirm password"
        secureTextEntry={true}
        value={credentials.confirmPass}
        onChangeText={(text) => handleChangeText(text, "confirmPass")}
      />
      <Button onPress={handleSubmit} title="Sign Up" />
      <Button
        onPress={() => {
          redirectToLoginScreen(navigation);
        }}
        style={styles.Login}
        title="Have an account? Login Now"
      />
    </SafeAreaView>
  );
};

// A str is considered a valid email if it is in the form of
// anystring@anystring.anystring
function isValidEmail(str) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(str);
}

function isPasswordTooShort(password) {
  return password.length < 6;
}

function redirectToLoginScreen(navigation) {
  navigation.replace("Login");
}

export default SignupScreen;

const styles = StyleSheet.create({
  Container: {
    display: "flex",
    rowGap: "15px",
    // height: "600px",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "cyan",
  },
  Login: {
    marginTop: "20px",
    alignSelf: "center",
  },
});
