import React from "react";
import { Dimensions, Platform } from "react-native";
import { Bubble } from "react-native-gifted-chat";
import styled from "styled-components/native";

const ChatBubble = (props) => {
  const { userData, ...remainingProps } = props;
  const currentMessage = remainingProps.currentMessage;
  const previousMessage = remainingProps.previousMessage;
  const isFirstMessage = Object.keys(previousMessage).length === 0;

  const isCurrentUser = currentMessage.user._id === remainingProps.user._id;
  const isSameUser =
    !isFirstMessage && currentMessage.user._id === previousMessage.user._id;
  const isSameDay =
    !isFirstMessage &&
    sameDay(currentMessage.createdAt, previousMessage.createdAt);

  const isUsernameShown = isCurrentUser || isSameUser || isSameDay;

  if (isUsernameShown) {
    return <Bubble {...remainingProps} />;
  }

  return (
    <BubbleContainer>
      <BubbleText>ayyaa</BubbleText>
      <Bubble {...remainingProps} />
    </BubbleContainer>
  );
};

export default ChatBubble;

function sameDay(d1, d2) {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

const width = Dimensions.get("screen").width;

const BubbleContainer = styled.View`
  width: ${width / 2 - 50}px;
`;

const BubbleText = styled.Text`
  font-family: ${Platform.OS === "ios" ? "Gill Sans" : "serif"};
  font-size: 12px;
  color: white;
`;
