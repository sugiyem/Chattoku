import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import FetchFriend from "../../firebase/FetchFriend";
import FetchUserInfo from "../../firebase/FetchUserInfo";
import GetUserWithUsername from "../../firebase/GetUserWithUsername";
import { addFriend, removeFriend } from "../../firebase/HandleFriend";

const AddFriendScreen = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const [ownUserName, setOwnUserName] = useState("");
  const [friendsID, setFriendsID] = useState([]);
  const [userFound, setUserFound] = useState(null);

  const handleClickOnSearch = () => {
    if (search === ownUserName) {
      Alert.alert(
        "This username is yours",
        "Search other username to add friend"
      );
      return;
    }

    GetUserWithUsername({
      specifiedUsername: search,
      onFound: (data) => setUserFound(data),
      onNotFound: () => setUserFound(null),
    });
  };

  const handleClickOnUser = ({ isFriend, id }) => {
    if (isFriend) {
      removeFriend(id);
    } else {
      addFriend(id);
    }
  };

  const RenderImage = ({ item }) => {
    const imageSource =
      item.img.length > 0
        ? { uri: item.img }
        : require("../../assets/default-profile.png");

    return <Image style={styles.image} source={imageSource} />;
  };

  const RenderUserFound = ({ item }) => {
    if (item === null) {
      return <Text> There is no user with such username</Text>;
    }

    const isUserFriend = friendsID.includes(item.id);

    return (
      <View style={styles.userContainer}>
        <RenderImage item={item} />

        <Text style={styles.whiteText}>{userFound.username}</Text>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            handleClickOnUser({ isFriend: isUserFriend, id: userFound.id });
          }}
        >
          <Text style={styles.editText}>
            {isUserFriend ? "Remove friend" : "Add friend"}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  useEffect(() => {
    return FetchUserInfo({
      onSuccesfulFetch: (data) => {
        setOwnUserName(data.username);
      },
      onFailure: (error) => {
        Alert.alert(error.message);
      },
    });
  }, []);

  useEffect(() => {
    return FetchFriend({
      onSuccesfulFetch: (data) => {
        setFriendsID(data.map((item) => item.id));
      },
      onFailure: (error) => {
        Alert.alert(error.message);
      },
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput
          value={search}
          onChangeText={(text) => setSearch(text)}
          style={styles.textInput}
          placeholder="Add user by its exact username"
        />

        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => handleClickOnSearch()}
        >
          <Text style={styles.whiteText}>Search</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => {
          navigation.replace("FriendList");
        }}
      >
        <Text>Back to friend's list</Text>
      </TouchableOpacity>

      <View style={styles.resultContainer}>
        <RenderUserFound item={userFound} />
      </View>
    </View>
  );
};

export default AddFriendScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "darkcyan",
    padding: 5,
    flex: 1,
  },
  searchBar: {
    flexDirection: "row",
  },
  textInput: {
    borderColor: "black",
    borderWidth: 1,
    margin: 5,
    backgroundColor: "white",
    color: "black",
    borderRadius: 10,
    padding: 2,
    flex: 3,
  },
  searchButton: {
    borderRadius: 10,
    padding: 5,
    margin: 5,
    flex: 1,
    backgroundColor: "darkslateblue",
  },
  backButton: {
    margin: 5,
    padding: 5,
    backgroundColor: "aquamarine",
    borderRadius: 10,
  },
  editText: {
    textAlign: "center",
    color: "#2e64e5",
  },
  whiteText: {
    textAlign: "center",
    color: "white",
  },
  resultContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  userContainer: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "navy",
    margin: 5,
    padding: 5,
  },
  image: {
    margin: 10,
    height: 150,
    width: 150,
    backgroundColor: "white",
    borderRadius: 75,
    borderWidth: 2,
    borderColor: "black",
  },
});
