import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Badge } from "react-native-elements";

const NotificationText = ({ text, isShown }) => {
  return (
    <View style={styles.textContainer}>
      <Text style={styles.text}>{text}</Text>
      {isShown && (
        <Badge
          status="primary"
          value="!"
          containerStyle={styles.badgeContainer}
        />
      )}
    </View>
  );
};

export default NotificationText;

const styles = StyleSheet.create({
  textContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  text: {
    textAlign: "center",
    flex: 4
  },
  badgeContainer: {
    flex: 1
  }
});
