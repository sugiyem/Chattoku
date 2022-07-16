import React from "react";
import { InputToolbar } from "react-native-gifted-chat";
import { CenteredBoldText } from "../../styles/GeneralStyles";

const ChatInputBar = (props) => {
  const { isBlocking, isBlocked, ...remainingProps } = props;

  if (isBlocked) {
    return (
      <CenteredBoldText size="18px" testID="blockedWarning">
        You've been blocked by this user
      </CenteredBoldText>
    );
  }

  if (isBlocking) {
    return (
      <>
        <CenteredBoldText size="15px" testID="blockingWarning">
          You've blocked this user.
        </CenteredBoldText>
        <CenteredBoldText size="15px">
          Unblock it before continue messaging.
        </CenteredBoldText>
      </>
    );
  }

  return <InputToolbar {...remainingProps} />;
};

export default ChatInputBar;
