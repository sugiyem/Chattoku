import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Image, Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { Icon, SocialIcon } from "react-native-elements";
import PostList from "../../components/Forum/ForumPost/PostList";

const Header = ({ img, title }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Image source={{ uri: img }} style={styles.logo} />
    </View>
  );
};

const ForumScreen = () => {
  const navigation = useNavigation();
  const [data, _] = useState(navigation.getState().routes[1].params.data);
  console.log(data.id);

  function handleAddButtonClick() {
    navigation.navigate("AddPost", { data: data });
  }

  return (
    <>
      <Header {...data} />
      <PostList forumId={data.id} />
      <Icon
        name="add"
        type="material"
        style={styles.add}
        size={50}
        onPress={handleAddButtonClick}
      />
    </>
  );
};

export default ForumScreen;

const styles = StyleSheet.create({
  logo: {
    height: 100,
    width: 100,
    borderRadius: 100
  },
  title: {
    fontSize: 22
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "cyan",
    padding: 30
  },
  add: {
    height: 70,
    width: 70,
    borderRadius: 100,
    borderColor: "black",
    borderWidth: 3,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-end"
  }
});
