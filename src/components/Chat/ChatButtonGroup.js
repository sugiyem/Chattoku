import React from "react";
import { Icon } from "react-native-elements";
import { ActionBar, ActionBarText } from "../../styles/ListStyles";
import { View } from "react-native";

const ChatButtonGroup = ({ buttonDetails }) => {
  return (
    <ActionBar>
      {buttonDetails.map((detail, id) => (
        <View key={id}>
          <Icon
            type={detail.type}
            name={detail.icon}
            size={30}
            color={detail.color}
            onPress={detail.onPress}
            testID={`icon-${id}`}
          />
          <ActionBarText testID={`title-${id}`}>{detail.title}</ActionBarText>
        </View>
      ))}
    </ActionBar>
  );
};

export default ChatButtonGroup;
