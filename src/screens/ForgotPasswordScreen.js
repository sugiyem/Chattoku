import React, { useState } from "react";
import { Alert, Text } from "react-native";
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
import { isValidEmail } from "../services/Authentication/CheckCredentials";
import { sendForgotPasswordEmail } from "../services/Authentication/HandleAuthentication";
import {
  redirectToLoginScreen,
  redirectToSignupScreen
} from "../services/Authentication/AuthNavigation";
import AnimatedInput from "../components/Miscellaneous/AnimatedInput";
import Loading from "../components/Miscellaneous/Loading";

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit() {
    setIsLoading(true);
    if (!isValidEmail(email)) {
      Alert.alert("Email is not valid");
    } else {
      await sendForgotPasswordEmail(email);
      setIsLoading(false);
    }
  }

  return (
    <GradientBackground>
      <Loading isLoading={isLoading}>
        <AuthContainer>
          <AppLogo source={require("../assets/logo.png")} />
          <AuthSystemContainer>
            <AuthTitle> Forgot Password </AuthTitle>
            <AnimatedInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
            />
            <AuthPrimaryButton onPress={handleSubmit}>
              <AuthPrimaryText>Send Password Reset Email</AuthPrimaryText>
            </AuthPrimaryButton>
            <AuthSecondaryButton
              onPress={() => redirectToSignupScreen(navigation)}
            >
              <AuthSecondaryText>
                Don't Have an Account? Sign Up Here
              </AuthSecondaryText>
            </AuthSecondaryButton>
            <AuthSecondaryButton
              onPress={() => redirectToLoginScreen(navigation)}
            >
              <AuthSecondaryText>Have an account? Login Now</AuthSecondaryText>
            </AuthSecondaryButton>
          </AuthSystemContainer>
        </AuthContainer>
      </Loading>
    </GradientBackground>
  );
};

export default ForgotPasswordScreen;
