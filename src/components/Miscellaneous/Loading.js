import React from "react";
import { ActivityIndicator } from "react-native";
import { Container } from "../../styles/GeneralStyles";

const Loading = () => {
  return (
    <Container>
      <ActivityIndicator size="large" />
    </Container>
  );
};

export default Loading;
