import { useNavigation } from "@react-navigation/native";
import { Text, View, StyleSheet } from "react-native";
import { Button, Card, Icon } from "react-native-elements";
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
    <Card style={styles.container}>
      <Text> User: {username}</Text>
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
    <>
      <MainPost {...data} />
      <Text style={styles.title}> Comments </Text>
      <CommentList {...data} />
      <Button
        title="Add Your Comment"
        style={styles.add}
        onPress={handleAddButtonClick}
      />
    </>
  );
};

export default ForumPostScreen;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 10
  },
  title: {
    fontSize: 16,
    textAlign: "center"
  },
  add: {
    height: 70,
    width: 70,
    borderRadius: 100,
    borderColor: "black",
    borderWidth: 3,
    alignItems: "center",
    justifyContent: "center"
  }
});
