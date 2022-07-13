import { Alert, Text } from "react-native";
import { useState } from "react";
import {
  AppLogo,
  AuthContainer,
  AuthSystemContainer,
  AuthPrimaryButton,
  AuthPrimaryText,
  AuthTitle,
  GradientBackground,
  AuthSecondaryButton,
  AuthSecondaryText
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
import AnimatedInput from "../components/Miscellaneous/AnimatedInput";

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
    <GradientBackground>
      <AuthContainer>
        <AppLogo source={require("../assets/logo.png")} />
        <AuthSystemContainer>
          <AuthTitle> Sign Up </AuthTitle>
          <AnimatedInput
            placeholder="Username"
            value={credentials.username}
            onChangeText={(text) => handleChangeText(text, "username")}
          />
          <AnimatedInput
            placeholder="Email"
            value={credentials.email}
            onChangeText={(text) => handleChangeText(text, "email")}
          />
          <AnimatedInput
            placeholder="Password"
            secureTextEntry={true}
            value={credentials.password}
            onChangeText={(text) => handleChangeText(text, "password")}
          />
          <AnimatedInput
            placeholder="Confirm Password"
            secureTextEntry={true}
            value={credentials.confirmPass}
            onChangeText={(text) => handleChangeText(text, "confirmPass")}
          />
          <AuthPrimaryButton onPress={handleSubmit}>
            <AuthPrimaryText>Sign Up</AuthPrimaryText>
          </AuthPrimaryButton>
          <AuthSecondaryButton
            onPress={() => redirectToLoginScreen(navigation)}
          >
            <AuthSecondaryText>Have an account? Login Now</AuthSecondaryText>
          </AuthSecondaryButton>
          <AuthSecondaryButton
            onPress={() => redirectToForgotPasswordScreen(navigation)}
          >
            <AuthSecondaryText>
              Forgot Your Password? Click Here
            </AuthSecondaryText>
          </AuthSecondaryButton>
        </AuthSystemContainer>
      </AuthContainer>
    </GradientBackground>
  );
};

export default SignupScreen;
