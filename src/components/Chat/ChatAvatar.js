import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Avatar } from "react-native-gifted-chat";
import ChatPopUp from "./ChatPopUp";

const initialData = {
  username: "",
  bio: "",
  img: ""
};
const ChatAvatar = (props) => {
  const { isPrivate, ...remainingProps } = props;

  if (isPrivate) {
    return null;
  }

  return <Avatar {...remainingProps} />;
};

export default ChatAvatar;

const styles = StyleSheet.create({});
