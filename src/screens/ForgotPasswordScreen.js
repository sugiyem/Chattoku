import React, { useState } from "react";
import { Alert, Text } from "react-native";
import {
  AuthContainer,
  AuthSystemContainer,
  AuthTextInput,
  AuthTitle
} from "../styles/AuthStyles";
import { Button, ButtonText, RoundedImage } from "../styles/GeneralStyles";
import { isValidEmail } from "../services/Authentication/CheckCredentials";
import { sendForgotPasswordEmail } from "../services/Authentication/HandleAuthentication";
import {
  redirectToLoginScreen,
  redirectToSignupScreen
} from "../services/Authentication/AuthNavigation";

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
    <AuthContainer>
      <RoundedImage source={require("../assets/logo.png")} />
      <AuthSystemContainer>
        <AuthTitle> Forgot Password </AuthTitle>
        <Text> Email </Text>
        <AuthTextInput
          placeholder="email"
          value={email}
          onChangeText={setEmail}
        />
        <Button color="#0000ff" onPress={handleSubmit}>
          <ButtonText color="#ffffff">Send Password Reset Email</ButtonText>
        </Button>
        <Button
          color="#0000ff"
          onPress={() => redirectToSignupScreen(navigation)}
        >
          <ButtonText color="#ffffff">
            Don't Have an Account? Sign Up Here
          </ButtonText>
        </Button>
        <Button
          color="#0000ff"
          onPress={() => redirectToLoginScreen(navigation)}
        >
          <ButtonText color="#ffffff">Have an account? Login Now</ButtonText>
        </Button>
      </AuthSystemContainer>
    </AuthContainer>
  );
};

export default ForgotPasswordScreen;
