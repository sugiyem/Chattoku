import { Card } from "react-native-elements";
import { Text, Touchable } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const ForumCard = ({ img, title }) => {
  return (
    <Card>
      <Card.Title> {title} </Card.Title>
      <Card.Divider />
      <TouchableOpacity>
        <Text> Go To Forum</Text>
      </TouchableOpacity>
      <Card.Image source={{ uri: img }} />
    </Card>
  );
};

export default ForumCard;
