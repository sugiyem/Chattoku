import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View, TouchableOpacity, Button } from "react-native";
import ForumList from "../../components/Forum/ForumList";

const ForumHomeScreen = () => {
  const navigation = useNavigation();

  function handleCreateForumClick() {
    navigation.navigate("CreateForum");
  }

  return (
    <View style={styles.container}>
      <ForumList />
      <TouchableOpacity style={styles.button}>
        <Button
          title={"Create Your Own Forum"}
          onPress={handleCreateForumClick}
        />
      </TouchableOpacity>
    </View>
  );
};

export default ForumHomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "darkcyan",
    padding: 5,
    flex: 1
  },
  button: {
    marginTop: 5,
    borderWidth: 0.3,
    borderColor: "black"
  }
});
