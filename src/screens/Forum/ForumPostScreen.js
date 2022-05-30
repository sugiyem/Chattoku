import { useNavigation } from "@react-navigation/native";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { Card } from "react-native-elements";
import { useState, useEffect } from "react";
import { firebase } from "../../firebase/Config";
import CommentList from "../../components/Forum/ForumComment/CommentList";

const MainPost = ({ title, content, uid }) => {
  const [username, setUsername] = useState("fetching username...");

  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .get()
      .then((snapshot) => setUsername(snapshot.data().username));
  }, []);

  return (
    <Card style={styles.headerContainer}>
      <Text> User: {username}</Text>
      <Card.Divider />
      <Card.Title style={styles.title}>{title}</Card.Title>
      <Text> {content} </Text>
    </Card>
  );
};

const ForumPostScreen = () => {
  const navigation = useNavigation();
  const [data, _] = useState(navigation.getState().routes[2].params.data);
  console.log("Forum Post Data");
  console.log(data);

  function handleAddButtonClick() {
    navigation.navigate("AddComment", { data: data });
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
      <MainPost {...data} />

      <View style={styles.textContainer}>
        <Text style={styles.text}> Comments </Text>
      </View>

      <CommentList {...data} />

      <TouchableOpacity style={styles.button} onPress={handleAddButtonClick}>
        <Text style={styles.buttonText}>Add Your Comment</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ForumPostScreen;

const styles = StyleSheet.create({
  container: {
    padding: 5,
    flex: 1,
    backgroundColor: "darkcyan"
  },
  headerContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 10
  },
  textContainer: {
    margin: 5,
    marginTop: 15,
    padding: 5,
    alignSelf: "stretch",
    borderTopWidth: 1
  },
  title: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 10
  },
  text: {
    fontSize: 20,
    fontWeight: "600",
    textDecorationLine: "underline",
    color: "darkslateblue",
    textAlign: "center"
  },
  button: {
    alignSelf: "stretch",
    padding: 5,
    margin: 5,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: "aquamarine"
  },
  buttonText: {
    textAlign: "center",
    color: "blue"
  }
});
