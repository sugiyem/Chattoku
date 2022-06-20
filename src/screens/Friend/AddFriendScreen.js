import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

import FetchUserInfo from "../../services/Profile/FetchUserInfo";
import GetUserWithUsername from "../../services/Friend/GetUserWithUsername";
import {
  fetchFriend,
  fetchFriendRequestsReceived,
  fetchFriendRequestsSent
} from "../../services/Friend/FetchFriendStatus";
import {
  addFriend,
  acceptFriendRequest,
  cancelFriendRequest,
  removeFriend
} from "../../services/Friend/HandleFriend";
import { getFriendshipStatus } from "../../services/Friend/FriendshipStatus";
import { friendshipType } from "../../constants/Friend";

const AddFriendScreen = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const [ownUserName, setOwnUserName] = useState("");
  const [friends, setFriends] = useState([]);
  const [friendRequestsSent, setFriendRequestsSent] = useState([]);
  const [friendRequestsReceived, setFriendRequestsReceived] = useState([]);
  const [userFound, setUserFound] = useState(null);

  useEffect(() => {
    return FetchUserInfo({
      onSuccesfulFetch: (data) => {
        setOwnUserName(data.username);
      },
      onFailure: (error) => {
        Alert.alert(error.message);
      }
    });
  }, []);

  useEffect(() => {
    return fetchFriend({
      onSuccess: (data) => {
        setFriends(data.map((item) => item.id));
      },
      onFailure: (error) => {
        Alert.alert("Error", error.message);
      }
    });
  }, []);

  useEffect(() => {
    return fetchFriendRequestsSent({
      onSuccess: (data) => {
        setFriendRequestsSent(data.map((item) => item.id));
      },
      onFailure: (error) => {
        Alert.alert("Error", error.message);
      }
    });
  }, []);

  useEffect(() => {
    return fetchFriendRequestsReceived({
      onSuccess: (data) => {
        setFriendRequestsReceived(data.map((item) => item.id));
      },
      onFailure: (error) => {
        Alert.alert("Error", error.message);
      }
    });
  }, []);

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
      onNotFound: () => setUserFound(null)
    });
  };

  const handleClickOnUser = ({ friendshipStatus, id }) => {
    console.log("clicked");
    if (friendshipStatus === friendshipType.FRIEND) {
      Alert.alert(
        "This user will be removed from your friend's list",
        "This action is irreversible. Do you want to continue?",
        [
          {
            text: "Cancel"
          },
          {
            text: "Continue",
            onPress: () => removeFriend(id)
          }
        ]
      );
    } else if (friendshipStatus === friendshipType.WAITING_RESPONSE) {
      Alert.alert(
        "This friend request will be removed",
        "This action is irreversible. Do you want to continue?",
        [
          {
            text: "Cancel"
          },
          {
            text: "Continue",
            onPress: () => cancelFriendRequest(id)
          }
        ]
      );
    } else if (friendshipStatus === friendshipType.RECEIVING_REQUEST) {
      acceptFriendRequest(id);
    } else if (friendshipStatus === friendshipType.NON_FRIEND) {
      addFriend(id);
    } else {
      return;
    }
  };

  const getTextByStatus = (friendshipStatus) => {
    let ans = "";

    switch (friendshipStatus) {
      case friendshipType.FRIEND:
        ans = "Unfriend";
        break;
      case friendshipType.WAITING_RESPONSE:
        ans = "Cancel request";
        break;
      case friendshipType.RECEIVING_REQUEST:
        ans = "Accept request";
        break;
      case friendshipType.NON_FRIEND:
        ans = "Add friend";
        break;
    }

    return ans;
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

    const friendshipStatus = getFriendshipStatus(
      item.id,
      friends,
      friendRequestsSent,
      friendRequestsReceived
    );

    return (
      <View style={styles.userContainer}>
        <RenderImage item={item} />

        <Text style={styles.whiteText}>{userFound.username}</Text>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            handleClickOnUser({
              friendshipStatus: friendshipStatus,
              id: userFound.id
            });
          }}
        >
          <Text style={styles.editText}>
            {getTextByStatus(friendshipStatus)}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

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
    flex: 1
  },
  searchBar: {
    flexDirection: "row"
  },
  textInput: {
    borderColor: "black",
    borderWidth: 1,
    margin: 5,
    backgroundColor: "white",
    color: "black",
    borderRadius: 10,
    padding: 2,
    flex: 3
  },
  searchButton: {
    borderRadius: 10,
    padding: 5,
    margin: 5,
    flex: 1,
    backgroundColor: "darkslateblue"
  },
  backButton: {
    margin: 5,
    padding: 5,
    backgroundColor: "aquamarine",
    borderRadius: 10
  },
  editText: {
    textAlign: "center",
    color: "#2e64e5"
  },
  whiteText: {
    textAlign: "center",
    color: "white"
  },
  resultContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  userContainer: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "navy",
    margin: 5,
    padding: 5
  },
  image: {
    margin: 10,
    height: 150,
    width: 150,
    backgroundColor: "white",
    borderRadius: 75,
    borderWidth: 2,
    borderColor: "black"
  }
});
