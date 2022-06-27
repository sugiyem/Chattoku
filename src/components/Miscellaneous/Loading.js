import React from "react";
import { ActivityIndicator } from "react-native";
import { Container } from "../../styles/GeneralStyles";

const Loading = ({ isLoading, children }) => {
  return isLoading ? (
    <Container>
      <ActivityIndicator size="large" />
    </Container>
  ) : (
    children
  );
};

export default Loading;
