import { Icon, ListItem } from "react-native-elements";

const ContactButtonGroup = ({ buttonDetails }) =>
  buttonDetails.map((detail, id) => (
    <ListItem
      key={id}
      bottomDivider
      onPress={detail.onPress}
      testID={`pressable-${id}`}
    >
      <Icon
        type={detail.type}
        name={detail.icon}
        size={30}
        color={detail.color}
        testID={`icon-${id}`}
      />
      <ListItem.Content>
        <ListItem.Title testID={`title-${id}`}>{detail.title}</ListItem.Title>
      </ListItem.Content>
    </ListItem>
  ));

export default ContactButtonGroup;
