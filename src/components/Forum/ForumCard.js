import { Card } from "react-native-elements";
import { Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

const ForumCard = ({ img, title, id }) => {
  const navigation = useNavigation();
  function goToForum() {
    navigation.navigate("Forum", {
      data: { img: img, title: title, id: id }
    });
  }

  return (
    <Card style={styles.container}>
      <Card.Image source={{ uri: img }} style={styles.image} />
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
