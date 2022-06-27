import { Alert, Text } from "react-native";
import { useState } from "react";
import {
  AuthContainer,
  AuthSystemContainer,
  AuthTextInput,
  AuthTitle
} from "../styles/AuthStyles";
import { Button, ButtonText, RoundedImage } from "../styles/GeneralStyles";
import {
  isUsernameTaken,
  isValidUsername
} from "../services/Authentication/CheckUsername";
import {
  isPasswordTooShort,
  isValidEmail
} from "../services/Authentication/CheckCredentials";
import { signUp } from "../services/Authentication/HandleAuthentication";
import {
  redirectToForgotPasswordScreen,
  redirectToLoginScreen
} from "../services/Authentication/AuthNavigation";

const initialState = {
  username: "",
  email: "",
  password: "",
  confirmPass: ""
};

const SignupScreen = ({ navigation }) => {
  const [credentials, setCredentials] = useState(initialState);

  function handleChangeText(text, name) {
    setCredentials({
      ...credentials,
      [name]: text
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
      signUp(credentials, () => redirectToLoginScreen(navigation));
    }
  }

  return (
    <AuthContainer>
      <RoundedImage source={require("../assets/logo.png")} />

      <AuthSystemContainer>
        <AuthTitle> Sign Up </AuthTitle>
        <Text> Username </Text>
        <AuthTextInput
          placeholder="username"
          value={credentials.username}
          onChangeText={(text) => handleChangeText(text, "username")}
        />
        <Text> Email </Text>
        <AuthTextInput
          placeholder="email"
          value={credentials.email}
          onChangeText={(text) => handleChangeText(text, "email")}
        />
        <Text> Password </Text>
        <AuthTextInput
          placeholder="password"
          secureTextEntry={true}
          value={credentials.password}
          onChangeText={(text) => handleChangeText(text, "password")}
        />
        <Text> Confirm password</Text>
        <AuthTextInput
          placeholder="confirm password"
          secureTextEntry={true}
          value={credentials.confirmPass}
          onChangeText={(text) => handleChangeText(text, "confirmPass")}
        />
        <Button color="#0000ff" onPress={handleSubmit}>
          <ButtonText color="#ffffff">Sign Up</ButtonText>
        </Button>
        <Button
          color="#0000ff"
          onPress={() => redirectToLoginScreen(navigation)}
        >
          <ButtonText color="#ffffff">Have an account? Login Now</ButtonText>
        </Button>
        <Button
          color="#0000ff"
          onPress={() => redirectToForgotPasswordScreen(navigation)}
        >
          <ButtonText color="#ffffff">
            Forgot Your Password? Click Here
          </ButtonText>
        </Button>
      </AuthSystemContainer>
    </AuthContainer>
  );
};

export default SignupScreen;
