import { Icon, ListItem } from "react-native-elements";

const ContactButtonGroup = ({ item, buttonDetails }) =>
  buttonDetails.map((detail, id) => (
    <ListItem key={id} bottomDivider onPress={detail.onPress}>
      <Icon
        type={detail.type}
        name={detail.icon}
        size={30}
        color={detail.color}
      />
      <ListItem.Content>
        <ListItem.Title>{detail.title}</ListItem.Title>
      </ListItem.Content>
    </ListItem>
  ));

export default ContactButtonGroup;
