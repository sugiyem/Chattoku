import { Icon, ListItem } from "react-native-elements";

const ContactButtonGroup = ({ item, buttonDetails }) =>
  buttonDetails.map((detail, id) => (
    <ListItem key={id} bottomDivider onPress={() => detail.onPress(item)}>
      <Icon name={detail.icon} size={30} color="blue" />
      <ListItem.Content>
        <ListItem.Title>{detail.title}</ListItem.Title>
      </ListItem.Content>
    </ListItem>
  ));

export default ContactButtonGroup;
