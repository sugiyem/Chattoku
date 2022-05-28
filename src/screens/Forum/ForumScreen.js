import { StyleSheet, Text } from "react-native";
import ForumCard from "../../components/Forum/ForumCard";

const testData = {
  img: "https://wallpaperaccess.com/full/8031977.png",
  title: "Kitagawa Marin Simp"
};

const ForumScreen = () => {
  return <ForumCard {...testData} />;
};

export default ForumScreen;

const styles = StyleSheet.create();
