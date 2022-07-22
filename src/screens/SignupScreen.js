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
import Loading from "../components/Miscellaneous/Loading";

const initialState = {
  username: "",
  email: "",
  password: "",
  confirmPass: ""
};

const SignupScreen = ({ navigation }) => {
  const [credentials, setCredentials] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);

  function handleChangeText(text, name) {
    setCredentials({
      ...credentials,
      [name]: text
    });
  }

  console.log(credentials);

  async function handleSubmit() {
    console.log("clicked");
    setIsLoading(true);
    const isUsernameNotAvailable = await isUsernameTaken(credentials.username);

    if (!isValidUsername(credentials.username)) {
      Alert.alert(
        "invalid username",
        "username must only contains alphanumeric characters and must at least be 1 character long"
      );
      setIsLoading(false);
    } else if (isUsernameNotAvailable) {
      Alert.alert("username is not available");
      setIsLoading(false);
    } else if (!isValidEmail(credentials.email)) {
      Alert.alert("email is not valid!");
      setIsLoading(false);
    } else if (credentials.password !== credentials.confirmPass) {
      Alert.alert("password doesn't match");
      setIsLoading(false);
    } else if (isPasswordTooShort(credentials.password)) {
      Alert.alert("password must at least be 6 characters long");
      setIsLoading(false);
    } else {
      await signUp(
        credentials,
        () => redirectToLoginScreen(navigation),
        () => {
          setIsLoading(false);
        }
      );
    }
  }

  return (
    <GradientBackground>
      <Loading isLoading={isLoading}>
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
      </Loading>
    </GradientBackground>
  );
};

export default SignupScreen;
