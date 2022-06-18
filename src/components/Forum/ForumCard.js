import { Card } from "react-native-elements";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const ForumCard = ({ img, title, id, owner }) => {
  const navigation = useNavigation();
  function goToForum() {
    navigation.navigate("Forum", {
      data: { img: img, title: title, id: id, owner: owner }
    });
  }

  return (
    <Card style={styles.container}>
      <Card.Image
        source={{ uri: img }}
        style={styles.image}
        containerStyle={styles.imageContainer}
      />
      <Card.Divider />
      <Card.Title style={styles.title}>{title}</Card.Title>
      <TouchableOpacity onPress={goToForum} style={styles.button}>
        <Text>Press Here To Continue to Forum</Text>
      </TouchableOpacity>
    </Card>
  );
};

export default ForumCard;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  title: {
    fontSize: 18
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "black",
    margin: 10
  },
  imageContainer: {
    alignSelf: "center",
    justifyContent: "center"
  },
  button: {
    borderRadius: 10,
    padding: 5,
    margin: 5,
    flex: 1,
    backgroundColor: "lightblue",
    alignItems: "center"
  }
});
