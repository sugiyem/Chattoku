import { Icon } from "react-native-elements";
import { ActionBar, ActionBarText } from "../../styles/ListStyles";
import { View } from "react-native";

const ContactButtonGroup = ({ buttonDetails }) => {
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
          />
          <ActionBarText>{detail.title}</ActionBarText>
        </View>
      ))}
    </ActionBar>
  );
};

export default ContactButtonGroup;
