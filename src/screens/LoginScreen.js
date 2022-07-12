import { Text } from "react-native";
import { useState, useEffect } from "react";
import {
  AuthContainer,
  AuthSystemContainer,
  AuthTextInput,
  AuthTitle
} from "../styles/AuthStyles";
import { Button, ButtonText, RoundedImage } from "../styles/GeneralStyles";
import {
  login,
  handleIsLoggedIn
} from "../services/Authentication/HandleAuthentication";
import {
  redirectToForgotPasswordScreen,
  redirectToSignupScreen
} from "../services/Authentication/AuthNavigation";
import AnimatedInput from "../components/Miscellaneous/AnimatedInput";

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

  useEffect(() => {
    handleIsLoggedIn(() => {
      navigation.replace("Dashboard");
    });
  });

  // console.log(credentials);

  return (
    <AuthContainer>
      <RoundedImage source={require("../assets/logo.png")} />
      <AuthSystemContainer>
        <AuthTitle> Log In </AuthTitle>
        <AnimatedInput
          value={credentials.email}
          placeholder="Email"
          onChangeText={(text) => handleChangeText(text, "email")}
        />
        {/* <Text> Email </Text>
        <AuthTextInput
          placeholder="email"
          value={credentials.email}
          onChangeText={(text) => handleChangeText(text, "email")}
        /> */}
        <AnimatedInput
          placeholder="Password"
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
