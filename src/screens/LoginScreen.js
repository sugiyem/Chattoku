import {
  StyleSheet,
  Text,
  SafeAreaView,
  Button,
  TextInput,
  Alert
} from "react-native";
import { firebase } from "../firebase/Config";
import { useState } from "react";

const initialState = {
  email: "",
  password: ""
};

const LoginScreen = ({ navigation }) => {
  const [credentials, setCredentials] = useState(initialState);

  function handleChangeText(text, name) {
    setCredentials({
      ...credentials,
      [name]: text
    });
  }

  console.log(credentials);

  async function handleSubmit() {
    await firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .catch((e) => {
        console.log("Incorrect Credentials");
        Alert.alert("Incorrect Email / Password");
      });

    const currentUser = await firebase.auth().currentUser;

    console.log(currentUser);

    if (currentUser === null) {
      return;
      // console.log("Incorrect Credentials");
      // Alert.alert("Incorrect Email / Password");
      // await firebase.auth().signOut();
    } else if (!currentUser.emailVerified) {
      console.log("email not verified");
      Alert.alert("Please Verify Your Email Before Logging In");
      await firebase.auth().signOut();
    } else {
      navigation.replace("Dashboard");
    }
  }

  return (
    <SafeAreaView style={styles.Container}>
      <Text> Log In </Text>
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
      <Button onPress={handleSubmit} title="Log In" />
      <Button
        onPress={() => {
          redirectToSignupScreen(navigation);
        }}
        style={styles.Login}
        title="Don't Have an Account? Sign Up Here"
      />
    </SafeAreaView>
  );
};

export default LoginScreen;

function redirectToSignupScreen(navigation) {
  navigation.replace("Signup");
}

const styles = StyleSheet.create({
  Container: {
    display: "flex",
    fontSize: "12px",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "aquamarine",
    flex: 1
  },
  Login: {
    marginTop: "20px",
    alignSelf: "center"
  }
});
