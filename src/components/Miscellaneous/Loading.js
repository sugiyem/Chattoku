import React from "react";
import { ActivityIndicator } from "react-native";
import { Container } from "../../styles/GeneralStyles";

const Loading = ({ isLoading, ExpectedRender }) => {
  return isLoading ? (
    <Container>
      <ActivityIndicator size="large" />
    </Container>
  ) : (
    <ExpectedRender />
  );
};

export default Loading;
