import { useState, useEffect } from "react";
import {
  AppLogo,
  AuthContainer,
  AuthPrimaryButton,
  AuthPrimaryText,
  AuthSecondaryButton,
  AuthSecondaryText,
  AuthSystemContainer,
  AuthTitle,
  GradientBackground
} from "../styles/AuthStyles";

import {
  login,
  handleIsLoggedIn
} from "../services/Authentication/HandleAuthentication";
import {
  redirectToForgotPasswordScreen,
  redirectToSignupScreen
} from "../services/Authentication/AuthNavigation";
import AnimatedInput from "../components/Miscellaneous/AnimatedInput";
import Loading from "../components/Miscellaneous/Loading";

const initialState = {
  email: "",
  password: ""
};

const LoginScreen = ({ navigation }) => {
  const [credentials, setCredentials] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);

  function handleChangeText(text, name) {
    setCredentials({
      ...credentials,
      [name]: text
    });
  }

  async function handleSubmit() {
    setIsLoading(true);
    await login(credentials, () => navigation.replace("Dashboard"));
    setIsLoading(false);
  }

  useEffect(() => {
    handleIsLoggedIn(() => {
      navigation.replace("Dashboard");
    });
  });

  // console.log(credentials);

  return (
    <GradientBackground>
      <Loading isLoading={isLoading}>
        <AuthContainer>
          <AppLogo source={require("../assets/logo.png")} />
          <AuthSystemContainer>
            <AuthTitle> Log In </AuthTitle>
            <AnimatedInput
              value={credentials.email}
              placeholder="Email"
              onChangeText={(text) => handleChangeText(text, "email")}
            />
            <AnimatedInput
              placeholder="Password"
              secureTextEntry={true}
              value={credentials.password}
              onChangeText={(text) => handleChangeText(text, "password")}
            />

            <AuthPrimaryButton onPress={handleSubmit}>
              <AuthPrimaryText>Log In</AuthPrimaryText>
            </AuthPrimaryButton>
            <AuthSecondaryButton
              color="#0000ff"
              onPress={() => redirectToSignupScreen(navigation)}
            >
              <AuthSecondaryText>
                Don't Have an Account? Sign Up Here
              </AuthSecondaryText>
            </AuthSecondaryButton>
            <AuthSecondaryButton
              color="#0000ff"
              onPress={() => redirectToForgotPasswordScreen(navigation)}
            >
              <AuthSecondaryText color="#ffffff">
                Forgot Your Password? Click Here
              </AuthSecondaryText>
            </AuthSecondaryButton>
          </AuthSystemContainer>
        </AuthContainer>
      </Loading>
    </GradientBackground>
  );
};

export default LoginScreen;
