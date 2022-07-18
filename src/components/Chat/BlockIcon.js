import React, { useEffect, useState } from "react";
import { Icon } from "react-native-elements";
import { IconContainer, IconDescription } from "../../styles/ChatStyles";
import {
  blockUser,
  unblockUser,
  isBlockedByCurrentUser
} from "../../services/Friend/HandleBlockedUser";
import Caution from "../Miscellaneous/Caution";

const BlockIcon = ({ userId, isSmall = false, defaultState = null }) => {
  const [isBlocked, setIsBlocked] = useState(defaultState);

  const isTest = defaultState !== null;

  useEffect(() => {
    if (isTest) return;

    return isBlockedByCurrentUser(
      userId,
      () => setIsBlocked(true),
      () => setIsBlocked(false)
    );
  }, []);

  function handleBlock() {
    if (isTest) {
      blockUser(userId);
      return;
    }

    Caution("This user will be blocked", () => blockUser(userId));
  }

  function handleUnblock() {
    if (isTest) {
      unblockUser(userId);
      return;
    }

    Caution("This user will be unblocked", () => unblockUser(userId));
  }

  const iconSize = isSmall ? 25 : 40;

  if (isBlocked) {
    return (
      <IconContainer isSmall={isSmall}>
        <Icon
          name="account-lock-open-outline"
          type="material-community"
          size={iconSize}
          color="green"
          onPress={handleUnblock}
          testID="unblockIcon"
        />
        <IconDescription
          color="green"
          isSmall={isSmall}
          testID="unblockDescription"
        >
          Unblock
        </IconDescription>
      </IconContainer>
    );
  } else {
    return (
      <IconContainer isSmall={isSmall}>
        <Icon
          name="block"
          type="material"
          size={iconSize}
          color={"#c10015"}
          onPress={handleBlock}
          testID="blockIcon"
        />
        <IconDescription
          color="#c10015"
          isSmall={isSmall}
          testID="blockDescription"
        >
          Block
        </IconDescription>
      </IconContainer>
    );
  }
};

export default BlockIcon;
