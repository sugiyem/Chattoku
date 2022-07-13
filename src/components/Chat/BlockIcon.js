import React, { useEffect, useState } from "react";
import { Icon } from "react-native-elements";
import { IconContainer, IconDescription } from "../../styles/ChatStyles";
import {
  blockUser,
  unblockUser,
  isBlockedByCurrentUser
} from "../../services/Friend/HandleBlockedUser";
import Caution from "../Miscellaneous/Caution";

const BlockIcon = ({ userId, isSmall = false }) => {
  const [isBlocked, setIsBlocked] = useState(false);

  useEffect(() => {
    return isBlockedByCurrentUser(
      userId,
      () => setIsBlocked(true),
      () => setIsBlocked(false)
    );
  }, []);

  function handleBlock() {
    Caution("This user will be blocked", () => blockUser(userId));
  }

  function handleUnblock() {
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
        />
        <IconDescription color="green" isSmall={isSmall}>
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
        />
        <IconDescription color="#c10015" isSmall={isSmall}>
          Block
        </IconDescription>
      </IconContainer>
    );
  }
};

export default BlockIcon;
