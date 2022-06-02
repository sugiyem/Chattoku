import React, { useEffect, useState } from "react";
import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { Avatar, Badge, Icon, ListItem } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { removeChat } from "../../firebase/HandlePrivateChat";
import FetchActiveChats from "../../firebase/FetchActiveChats";

const ChatListScreen = () => {
  const [search, setSearch] = useState("");
  const [activeChats, setActiveChats] = useState([]);
  const [expand, setExpand] = useState(null);
  const navigation = useNavigation();

  const datas = [
    {
      title: "Open Message",
      icon: "message",
      color: "blue",
      onPress: (item) =>
        navigation.navigate("ChatDetail", {
          recipientID: item.id,
          recipientUsername: item.username
        })
    },
    {
      title: "Remove",
      icon: "delete",
      color: "red",
      onPress: (item) => removeChat(item)
    }
  ];

  useEffect(() => {
    return FetchActiveChats({
      onSuccess: (data) => setActiveChats(data),
      onFailure: (error) => Alert.alert(error.message)
    });
  }, []);

  const RenderAccordion = ({ item }) =>
    datas.map((data, id) => (
      <ListItem key={id} bottomDivider onPress={() => data.onPress(item)}>
        <Icon name={data.icon} size={30} color={data.color} />
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
        containerStyle={styles.chatImage}
      />
    );
  };

  const RenderChats = ({ items }) =>
    items.map((item, index) => (
      <ListItem.Accordion
        key={index}
        bottomDivider
        content={
          <>
            <RenderImage item={item} />
            <ListItem.Content>
              <ListItem.Title style={styles.username}>
                {item.username}
              </ListItem.Title>
              <ListItem.Subtitle>
                <Text>Last message: {item.lastMessage}</Text>
              </ListItem.Subtitle>
              <ListItem.Subtitle>
                <Text>
                  {item.lastMessageTime.toDateString() +
                    ", " +
                    item.lastMessageTime.toLocaleTimeString()}
                </Text>
              </ListItem.Subtitle>
              {item.showNotif && (
                <Badge
                  status="success"
                  value="There are unread messages"
                  containerStyle={styles.badgeContainer}
                />
              )}
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

  return (
    <ScrollView style={styles.container}>
      <TextInput
        value={search}
        onChangeText={setSearch}
        placeholder="Search messages"
        style={styles.textInput}
      />

      <Text style={styles.title}>Active Chats List</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Friends")}
      >
        <Text style={styles.buttonText}>Message other users</Text>
      </TouchableOpacity>

      <View style={styles.chatLists}>
        <RenderChats
          items={activeChats.filter((item) =>
            item.username.toLowerCase().startsWith(search.toLowerCase())
          )}
        />
      </View>
    </ScrollView>
  );
};

export default ChatListScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "darkcyan",
    flex: 1,
    padding: 5
  },
  textInput: {
    borderColor: "black",
    borderWidth: 1,
    margin: 5,
    backgroundColor: "white",
    color: "black",
    borderRadius: 10,
    padding: 2
  },
  button: {
    alignSelf: "stretch",
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 10,
    padding: 5,
    backgroundColor: "aquamarine"
  },
  buttonText: {
    textAlign: "center"
  },
  title: {
    fontFamily: Platform.OS === "ios" ? "Gill Sans" : "serif",
    fontSize: 30,
    fontWeight: "bold",
    textDecorationLine: "underline"
  },
  username: {
    fontWeight: "600",
    textDecorationLine: "underline",
    color: "darkslateblue"
  },
  badgeContainer: {
    margin: 5
  },
  chatLists: {
    flex: 1,
    alignSelf: "stretch",
    margin: 10,
    padding: 5
  },
  chatImage: {
    marginRight: 10,
    borderColor: "black",
    borderWidth: 1
  }
});
