import React, { useEffect, useState } from "react";
import { Icon } from "react-native-elements";
import { IconContainer, IconDescription } from "../../styles/ChatStyles";

const BlockIcon = ({ userId, isSmall = false }) => {
  function handleBlock() {}

  function handleUnblock() {}

  const iconSize = isSmall ? 25 : 40;

  return (
    <IconContainer isSmall={isSmall}>
      <Icon
        name="block"
        type="material"
        size={iconSize}
        color={"#c10015"}
        onPress={() => handleBlock}
      />
      <IconDescription color="#c10015" isSmall={isSmall}>
        Block
      </IconDescription>
    </IconContainer>
  );
};

export default BlockIcon;
