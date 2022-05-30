import { Alert } from "react-native";

export default function Warning(onContinue) {
  Alert.alert(
    "WARNING",
    "This action is irreversible, are you sure you want to continue?",
    [
      {
        text: "cancel"
      },
      {
        text: "continue",
        onPress: onContinue
      }
    ]
  );
}
