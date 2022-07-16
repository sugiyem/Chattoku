import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";

const primaryColor = "#44d0fe";
const secondaryColor = "navy";

export const AppLogo = styled.Image`
  border-radius: 1000px;
  width: 250px;
  height: 80px;
`;

export const AuthContainer = styled.SafeAreaView`
  flex: 1;
  padding: 5px;
  row-gap: 15px;
  justify-content: center;
  align-items: center;
`;

export const GradientBackground = ({ children }) => {
  return (
    <LinearGradient
      colors={["#89dcf4", "#734ae8"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      {children}
    </LinearGradient>
  );
};

export const AuthSystemContainer = styled.View`
  margin: 0px 20px;
  border-radius: 10px;
  padding: 20px 10px;
  align-self: stretch;
`;

export const AuthTextInput = styled.TextInput`
  border-radius: 10px;
  border-width: 1px;
  align-self: stretch;
  background-color: #ffffff;
  padding: 5px;
  margin-vertical: 10px;
`;

export const AuthTitle = styled.Text`
  text-align: center;
  font-weight: 600;
  font-size: 25px;
  color: #483d8b;
`;

export const AuthPrimaryButton = styled.TouchableOpacity`
  padding: 10px;
  margin: 10px 0px;
  border-radius: 15px;
  background-color: ${secondaryColor};
  border-width: 0.8px;
  border-color: ${primaryColor};
`;

export const AuthPrimaryText = styled.Text`
  color: ${primaryColor};
  font-size: 18px;
  font-weight: 600;
  align-self: center;
`;

export const AuthSecondaryButton = styled.TouchableOpacity`
  padding: 10px;
  margin: 10px 0px;
  border-radius: 15px;
  background-color: ${primaryColor};
  border-width: 0.8px;
  border-color: ${secondaryColor};
`;

export const AuthSecondaryText = styled.Text`
  color: ${secondaryColor};
  font-size: 16px;
  align-self: center;
`;
