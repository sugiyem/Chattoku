import { Alert } from "react-native";
import React from "react";

const Caution = (text, onContinue) => {
  return Alert.alert(
    text,
    "This action is irreversible. Do you want to continue?",
    [{ text: "Cancel" }, { text: "Continue", onPress: onContinue }]
  );
};

export default Caution;
