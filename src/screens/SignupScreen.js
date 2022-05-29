import {
  Alert,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
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
        "invalid username",
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
            friends: [],
            id: currentUID,
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
    <SafeAreaView style={styles.container}>
      <Image style={styles.logoImage} source={require("../assets/logo.png")} />

      <View style={styles.systemContainer}>
        <Text style={styles.title}> Sign Up </Text>
        <Text> Username </Text>
        <TextInput
          style={styles.textInputContainer}
          placeholder="username"
          value={credentials.username}
          onChangeText={(text) => handleChangeText(text, "username")}
        />
        <Text> Email </Text>
        <TextInput
          style={styles.textInputContainer}
          placeholder="email"
          value={credentials.email}
          onChangeText={(text) => handleChangeText(text, "email")}
        />
        <Text> Password </Text>
        <TextInput
          style={styles.textInputContainer}
          placeholder="password"
          secureTextEntry={true}
          value={credentials.password}
          onChangeText={(text) => handleChangeText(text, "password")}
        />
        <Text> Confirm password</Text>
        <TextInput
          style={styles.textInputContainer}
          placeholder="confirm password"
          secureTextEntry={true}
          value={credentials.confirmPass}
          onChangeText={(text) => handleChangeText(text, "confirmPass")}
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            redirectToLoginScreen(navigation);
          }}
        >
          <Text style={styles.buttonText}>Have an account? Login Now</Text>
        </TouchableOpacity>
      </View>
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
  container: {
    flex: 1,
    padding: 5,
    rowGap: "15px",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "darkcyan",
  },
  logoImage: {
    height: 150,
    width: 150,
    borderRadius: 75,
    borderWidth: 1,
    backgroundColor: "white",
    marginBottom: 10,
  },
  systemContainer: {
    margin: 10,
    backgroundColor: "cyan",
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    alignSelf: "stretch",
  },
  title: {
    textAlign: "center",
    fontWeight: "600",
    fontSize: 25,
    color: "darkslateblue",
  },
  textInputContainer: {
    borderRadius: 10,
    borderWidth: 1,
    alignSelf: "stretch",
    backgroundColor: "white",
    padding: 5,
    marginVertical: 10,
  },
  button: {
    alignSelf: "stretch",
    textAlign: "center",
    backgroundColor: "blue",
    borderRadius: 5,
    borderWidth: 1,
    marginVertical: 5,
    padding: 5,
  },
  buttonText: {
    textAlign: "center",
    color: "white",
  },
});
