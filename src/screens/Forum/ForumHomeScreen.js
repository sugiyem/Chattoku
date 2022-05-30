import { StyleSheet, View } from "react-native";
import ForumList from "../../components/Forum/ForumList";

const ForumHomeScreen = () => {
  return (
    <View style={styles.container}>
      <ForumList />
    </View>
  );
};

export default ForumHomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "darkcyan",
    padding: 5,
    flex: 1
  }
});
