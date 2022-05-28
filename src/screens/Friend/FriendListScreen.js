import React, { useEffect, useState } from "react";
import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Avatar, Icon, ListItem } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import FetchFriend from "../../firebase/FetchFriend";
import { removeFriend } from "../../firebase/HandleFriend";

const FriendListScreen = () => {
  const [friends, setFriends] = useState([]);
  const [search, setSearch] = useState("");
  const [expand, setExpand] = useState(null);

  const navigation = useNavigation();

  const datas = [
    {
      title: "Message",
      icon: "message",
      onPress: (item) => navigation.navigate("Chat"),
    },
    {
      title: "Unfriend",
      icon: "person-remove",
      onPress: (item) => removeFriend(item),
    },
  ];

  const RenderAccordion = ({ item }) =>
    datas.map((data, id) => (
      <ListItem key={id} bottomDivider onPress={() => data.onPress(item.id)}>
        <Icon name={data.icon} size={30} color="blue" />
        <ListItem.Content>
          <ListItem.Title>{data.title}</ListItem.Title>
        </ListItem.Content>
      </ListItem>
    ));

  const RenderImage = ({ item }) => {
    const imageSource =
      item.img.length > 0
        ? { uri: item.img }
        : require("../../assets/default-profile.png");

    return (
      <Avatar
        rounded
        source={imageSource}
        size="medium"
        containerStyle={styles.friendImage}
      />
    );
  };

  const RenderFriends = ({ items }) =>
    items.map((item, index) => (
      <ListItem.Accordion
        key={index}
        bottomDivider
        content={
          <>
            <RenderImage item={item} />
            <ListItem.Content>
              <ListItem.Title>{item.username}</ListItem.Title>
              <ListItem.Subtitle>{item.bio}</ListItem.Subtitle>
            </ListItem.Content>
          </>
        }
        isExpanded={expand === index}
        onPress={() => {
          if (expand === index) {
            setExpand(null);
          } else {
            setExpand(index);
          }
        }}
      >
        {expand === index && <RenderAccordion item={item} />}
      </ListItem.Accordion>
    ));

  useEffect(() => {
    return FetchFriend({
      onSuccesfulFetch: (data) => {
        setFriends(data);
      },
      onFailure: (error) => {
        Alert.alert(error.message);
      },
    });
  }, []);

  return (
    <ScrollView style={styles.container}>
      <TextInput
        value={search}
        onChangeText={(text) => setSearch(text)}
        placeholder="Search friend by username"
        style={styles.textInput}
      />

      <Text style={styles.title}>Friends List</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("AddFriend")}
      >
        <Text>Add more friends</Text>
      </TouchableOpacity>

      <View style={styles.friendContainer}>
        <RenderFriends
          items={friends.filter((data) =>
            data.username.toLowerCase().startsWith(search.toLowerCase())
          )}
        />
      </View>
    </ScrollView>
  );
};

export default FriendListScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "darkcyan",
    padding: 5,
    flex: 1,
  },
  textInput: {
    borderColor: "black",
    borderWidth: 1,
    margin: 5,
    backgroundColor: "white",
    color: "black",
    borderRadius: 10,
    padding: 2,
  },
  button: {
    margin: 5,
    padding: 5,
    backgroundColor: "aquamarine",
    borderRadius: 10,
  },
  title: {
    fontFamily: Platform.OS === "ios" ? "Gill Sans" : "serif",
    fontSize: 30,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  friendContainer: {
    flex: 1,
    alignSelf: "stretch",
    margin: 10,
    padding: 5,
  },
  friendImage: {
    marginRight: 10,
    borderColor: "black",
    borderWidth: 1,
  },
});
