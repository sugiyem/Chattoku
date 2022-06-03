import {
  Alert,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
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

  // console.log(credentials);

  async function handleSubmit() {
    await firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .catch((e) => {
        console.log("Incorrect Credentials");
        Alert.alert("Incorrect Email / Password");
      });

    const currentUser = firebase.auth().currentUser;

    console.log(currentUser);

    if (currentUser === null) {
      return;
      // console.log("Incorrect Credentials");
      // Alert.alert("Incorrect Email / Password");
      // await firebase.auth().signOut();
    } else if (!currentUser.emailVerified) {
      console.log("email not verified");
      Alert.alert("Please Verify Your Email Before Logging In", "", [
        {
          text: "Resend verification email",
          onPress: () => currentUser.sendEmailVerification()
        },
        {
          text: "Cancel"
        }
      ]);
      await firebase.auth().signOut();
    } else {
      navigation.replace("Dashboard");
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.logoImage} source={require("../assets/logo.png")} />
      <View style={styles.systemContainer}>
        <Text style={styles.title}> Log In </Text>
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
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            redirectToSignupScreen(navigation);
          }}
        >
          <Text style={styles.buttonText}>
            Don't Have an Account? Sign Up Here
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            redirectToForgotPasswordScreen(navigation);
          }}
        >
          <Text style={styles.buttonText}>
            Forgot Your Password? Click Here
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

function redirectToSignupScreen(navigation) {
  navigation.replace("Signup");
}

function redirectToForgotPasswordScreen(navigation) {
  navigation.replace("ForgotPassword");
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    rowGap: "15px",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "darkcyan"
  },
  logoImage: {
    height: 150,
    width: 150,
    borderRadius: 75,
    borderWidth: 1,
    backgroundColor: "white",
    marginBottom: 10
  },
  systemContainer: {
    margin: 10,
    backgroundColor: "cyan",
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    alignSelf: "stretch"
  },
  title: {
    textAlign: "center",
    fontWeight: "600",
    fontSize: 25,
    color: "darkslateblue"
  },
  textInputContainer: {
    borderRadius: 10,
    borderWidth: 1,
    alignSelf: "stretch",
    backgroundColor: "white",
    padding: 5,
    marginVertical: 10
  },
  button: {
    alignSelf: "stretch",
    textAlign: "center",
    backgroundColor: "blue",
    borderRadius: 5,
    borderWidth: 1,
    marginVertical: 5,
    padding: 5
  },
  buttonText: {
    textAlign: "center",
    color: "white"
  }
});
