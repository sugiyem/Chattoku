import React from "react";
import { Container } from "../../styles/GeneralStyles";
import LoaderAnimation from "./LoaderAnimation";

const Loading = ({ isLoading, children }) => {
  return isLoading ? (
    <Container>
      <LoaderAnimation />
    </Container>
  ) : (
    children
  );
};

export default Loading;
