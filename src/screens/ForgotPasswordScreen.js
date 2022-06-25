import React, { useState } from "react";
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
import {
  isValidEmail,
  redirectToLoginScreen,
  redirectToSignupScreen,
  sendForgotPasswordEmail
} from "../services/Authentication/HandleAuthentication";

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");

  async function handleSubmit() {
    if (!isValidEmail(email)) {
      Alert.alert("Email is not valid");
    } else {
      await sendForgotPasswordEmail(email);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.logoImage} source={require("../assets/logo.png")} />
      <View style={styles.systemContainer}>
        <Text style={styles.title}> Forgot Password </Text>
        <Text> Email </Text>
        <TextInput
          style={styles.textInputContainer}
          placeholder="email"
          value={email}
          onChangeText={setEmail}
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Send Password Reset Email</Text>
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
            redirectToLoginScreen(navigation);
          }}
        >
          <Text style={styles.buttonText}>Have an account? Login Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;

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
