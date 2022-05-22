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

  function handleChange(event, name) {
    setCredentials({
      ...credentials,
      [name]: event.target.value
    });
  }

  console.log(credentials);

  async function handleSubmit() {
    await firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .catch((e) => {
        console.error(e);
      });

    const currentUser = await firebase.auth().currentUser;

    console.log(currentUser);

    if (currentUser === null) {
      Alert.alert("Incorrect Email / Password");
      await firebase.auth().signOut();
    } else if (!currentUser.emailVerified) {
      Alert.alert("Please Verify Your Email Before Logging In");
      await firebase.auth().signOut();
    } else {
      navigation.navigate("Dashboard");
    }
  }

  return (
    <SafeAreaView style={styles.Container}>
      <Text> Log In </Text>
      <Text> email </Text>
      <TextInput
        placeholder="email"
        value={credentials.email}
        onChange={(e) => handleChange(e, "email")}
      />
      <Text> password </Text>
      <TextInput
        placeholder="password"
        secureTextEntry={true}
        value={credentials.password}
        onChange={(e) => handleChange(e, "password")}
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
  navigation.navigate("Signup");
}

const styles = StyleSheet.create({
  Container: {
    display: "flex",
    rowGap: "15px",
    height: "100vh",
    backgroundColor: "cyan"
  },
  Login: {
    marginTop: "20px",
    alignSelf: "center"
  }
});
