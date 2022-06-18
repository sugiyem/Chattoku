import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Image, Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import PostList from "../../components/Forum/ForumPost/PostList";
import { firebase } from "../../firebase/Config.js";

const Header = ({ img, title }) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.title}>{title}</Text>
      <Image source={{ uri: img }} style={styles.logo} />
    </View>
  );
};

const ForumScreen = () => {
  const navigation = useNavigation();
  const data = navigation.getState().routes[1].params.data;
  const currentUID = firebase.auth().currentUser.uid;
  const isOwner = data.owner === currentUID;

  function handleAddButtonClick() {
    navigation.navigate("AddPost", { data: data });
  }

  function handleEditForumButton() {
    navigation.navigate("EditForum", { data: data });
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
      {isOwner && (
        <TouchableOpacity style={styles.button} onPress={handleEditForumButton}>
          <Text style={styles.buttonText}>Edit Forum</Text>
        </TouchableOpacity>
      )}
      <Header {...data} />
      <PostList forumId={data.id} isOwner={isOwner} />
      <Icon
        name="add"
        type="material"
        style={styles.add}
        size={50}
        onPress={handleAddButtonClick}
      />
    </View>
  );
};

export default ForumScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "darkcyan",
    padding: 5
  },
  logo: {
    marginTop: 10,
    height: 100,
    width: 100,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "black"
  },
  title: {
    fontSize: 22
  },
  headerContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "cyan",
    borderRadius: 10,
    borderColor: "blue",
    borderWidth: 1,
    margin: 5,
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
