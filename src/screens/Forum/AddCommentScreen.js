import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Alert
} from "react-native";
import { Card } from "react-native-elements";
import { AddComment } from "../../services/Forum/HandleComment";
import { FetchInfoById } from "../../services/Profile/FetchUserInfo";

const MainPost = ({ title, content, uid }) => {
  const [username, setUsername] = useState("fetching username...");

  //Fetch username of poster
  useEffect(() => {
    FetchInfoById(uid, (userData) => setUsername(userData.username));
  }, []);

  return (
    <Card style={styles.container}>
      <Text> User: {username}</Text>
      <Card.Title style={styles.header}>{title}</Card.Title>
      <Text> {content} </Text>
    </Card>
  );
};

const AddCommentScreen = () => {
  const navigation = useNavigation();
  const [data, _] = useState(navigation.getState().routes[2].params.data);
  const [comment, setComment] = useState("");

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>

      <View style={styles.detailContainer}>
        <MainPost {...data} />
        <TextInput
          multiline={true}
          style={styles.input}
          placeholder="write your comment..."
          onChangeText={(t) => setComment(t)}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            AddComment(
              data.forumId,
              data.postId,
              comment,
              () => navigation.navigate("Post", { data: data }),
              (e) => Alert.alert(e)
            )
          }
        >
          <Text style={styles.buttonText}>Post Comment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddCommentScreen;

const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 10
  },
  title: {
    fontSize: 16,
    textAlign: "center"
  },
  container: {
    backgroundColor: "darkcyan",
    flex: 1,
    padding: 5,
    borderColor: "black"
  },
  detailContainer: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "cyan",
    padding: 20,
    margin: 5
  },
  input: {
    height: 200,
    backgroundColor: "whitesmoke",
    borderColor: "black",
    borderWidth: 0.5,
    padding: 10,
    textAlignVertical: "top",
    margin: 20
  },
  button: {
    padding: 5,
    margin: 5,
    alignSelf: "stretch",
    borderRadius: 5,
    backgroundColor: "blue"
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontSize: 18
  }
});
