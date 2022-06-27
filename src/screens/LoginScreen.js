import { Text } from "react-native";
import { useState } from "react";
import {
  AuthContainer,
  AuthSystemContainer,
  AuthTextInput,
  AuthTitle
} from "../styles/AuthStyles";
import { Button, ButtonText, RoundedImage } from "../styles/GeneralStyles";
import { login } from "../services/Authentication/HandleAuthentication";
import {
  redirectToForgotPasswordScreen,
  redirectToSignupScreen
} from "../services/Authentication/AuthNavigation";

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

  async function handleSubmit() {
    await login(credentials, () => navigation.replace("Dashboard"));
  }

  // console.log(credentials);

  return (
    <AuthContainer>
      <RoundedImage source={require("../assets/logo.png")} />
      <AuthSystemContainer>
        <AuthTitle> Log In </AuthTitle>
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
        <Button color="#0000ff" onPress={handleSubmit}>
          <ButtonText color="#ffffff">Log In</ButtonText>
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

export default LoginScreen;
