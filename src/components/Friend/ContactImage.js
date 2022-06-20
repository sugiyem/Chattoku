import React from "react";
import { StyleSheet } from "react-native";
import { Avatar } from "react-native-elements";

const ContactImage = ({ item }) => {
  const imageSource =
    item.img.length > 0
      ? { uri: item.img }
      : require("../../assets/default-profile.png");

  return (
    <Avatar
      rounded
      source={imageSource}
      size="medium"
      containerStyle={styles.image}
    />
  );
};

export default ContactImage;

const styles = StyleSheet.create({
  image: {
    marginRight: 10,
    borderColor: "black",
    borderWidth: 1
  }
});
