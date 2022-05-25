import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Avatar, Button, ListItem } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { firebase } from "../../firebase/Config";

const initialState = {
  username: "",
  bio: "",
  img: "",
  genres: [],
};

const defaultImg =
  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png";

/*
const RenderFavoriteAnime = ({ items, navigation }) => {
  const removeButton = (item) => (
    <Button
      title="Remove from favorite"
      icon={{ name: "delete", color: "white" }}
      buttonStyle={styles.removeButton}
      onPress={() => {
        removeAnimeFromFavorite(item);
      }}
    />
  );

  return (
    <FlatList
      style={styles.animeContainer}
      data={items}
      renderItem={({ item, index }) => (
        <ListItem.Swipeable key={index} rightContent={removeButton(item)}>
          <Avatar source={{ uri: item.image }} />
          <ListItem.Content>
            <ListItem.Title>{item.title}</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem.Swipeable>
      )}
      ListHeaderComponent={
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Anime");
          }}
        >
          <Text>Add more favorite anime</Text>
        </TouchableOpacity>
      }
    />
  );
};

const RenderFavoriteGenre = ({ items, navigation }) => {
  const removeButton = (item) => (
    <Button
      title="Remove from favorite"
      icon={{ name: "delete", color: "white" }}
      buttonStyle={styles.removeButton}
      onPress={() => {
        removeGenreFromFavorite(item);
      }}
    />
  );

  return (
    <FlatList
      style={styles.animeContainer}
      data={items}
      renderItem={({ item, index }) => (
        <ListItem.Swipeable key={index} rightContent={removeButton(item)}>
          <ListItem.Content>
            <ListItem.Title>{item}</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem.Swipeable>
      )}
      ListHeaderComponent={
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("EditGenre");
          }}
        >
          <Text>Add more favorite genre</Text>
        </TouchableOpacity>
      }
    />
  );
};
*/

const ProfileHomeScreen = () => {
  const [userInfo, setUserInfo] = useState(initialState);
  const [favoriteAnime, setFavoriteAnime] = useState([]);
  const [animeExpanded, setAnimeExpanded] = useState(false);
  const [genreExpanded, setGenreExpanded] = useState(false);

  const navigation = useNavigation();

  async function logOut() {
    try {
      navigation.replace("Login");
      firebase.auth().signOut();
    } catch (error) {
      Alert.alert(error.message);
    }
  }

  useEffect(() => {
    const userID = firebase.auth().currentUser.uid;

    return firebase
      .firestore()
      .collection("users")
      .doc(userID)
      .onSnapshot(
        (documentSnapshot) => {
          setUserInfo({
            username: documentSnapshot.data().username,
            bio: documentSnapshot.data().bio,
            img:
              documentSnapshot.data().img.length > 0
                ? documentSnapshot.data().img
                : defaultImg,
            genres: documentSnapshot.data().genres,
          });
        },
        (error) => {
          Alert.alert(error.message);
        }
      );
  }, []);

  useEffect(() => {
    const userID = firebase.auth().currentUser.uid;

    return firebase
      .firestore()
      .collection("users")
      .doc(userID)
      .collection("anime")
      .onSnapshot(
        (querySnapshot) => {
          const favoriteList = [];
          querySnapshot.forEach((documentSnapshot) => {
            favoriteList.push(documentSnapshot.data());
          });
          setFavoriteAnime(favoriteList);
        },
        (error) => {
          Alert.alert(error.message);
        }
      );
  }, []);

  return (
    <ScrollView style={styles.container}>
      {userInfo.img.length > 0 ? (
        <Image style={styles.img} source={{ uri: userInfo.img }} />
      ) : (
        <Image style={styles.img} source={require("../../assets/logo.png")} />
      )}
      <Text style={styles.username}>{userInfo.username}</Text>
      <Text style={styles.bio}>{userInfo.bio}</Text>
      <View style={styles.buttonGroup}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate("EditProfile", { data: userInfo });
          }}
        >
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => logOut()}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <ListItem.Accordion
        content={<Text>Favorite Genre</Text>}
        expand={genreExpanded}
        onPress={() => setGenreExpanded(!genreExpanded)}
      >
        <View>
          <TouchableOpacity onPress={() => navigation.navigate("EditGenre")}>
            <Text>Add more genre to favorites</Text>
          </TouchableOpacity>
          {/*userInfo.genres.map((item, i) => {
            const removeButton = (item) => (
              <Button
                title="Remove from favorite"
                icon={{ name: "delete", color: "white" }}
                buttonStyle={styles.removeButton}
                onPress={() => {
                  removeGenreFromFavorite(item);
                }}
              />
            );

            return (
              <ListItem.Swipeable key={i} rightContent={removeButton(item)}>
                <ListItem.Content>
                  <ListItem.Title>{item}</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
              </ListItem.Swipeable>
            );
          })*/}
        </View>
      </ListItem.Accordion>

      {/*favorites.map((item, i) => (
        <ListItem.Accordion
          key={i}
          content={<Text>{item.title}</Text>}
          expand={item.expand}
          onPress={() => item.setExpand(!item.expand)}
        >
          <item.render items={item.data} navigation={navigation} />
        </ListItem.Accordion>
      ))*/}
    </ScrollView>
  );
};

export default ProfileHomeScreen;

async function removeGenreFromFavorite(item) {
  await firebase
    .firestore()
    .collection("users")
    .doc(firebase.auth().currentUser.uid)
    .update({
      genres: firebase.firestore.FieldValue.arrayRemove(item),
    })
    .then(() => {
      Alert.alert("Genre succesfully removed from favorite");
    })
    .catch((error) => Alert.alert(error.message));
}

async function removeAnimeFromFavorite(item) {
  await firebase
    .firestore()
    .collection("users")
    .doc(firebase.auth().currentUser.uid)
    .collection("anime")
    .doc(item.id.toString())
    .delete()
    .then(() => {
      Alert.alert("Anime succesfully removed from favorite");
    })
    .catch((error) => Alert.alert(error.message));
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "darkcyan",
    padding: 5,
    flex: 1,
  },
  contentContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  img: {
    height: 150,
    width: 150,
    borderRadius: 75,
  },
  username: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  bio: {
    fontSize: 12,
    fontWeight: "600",
    color: "#666",
    textAlign: "center",
    marginBottom: 10,
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    marginBottom: 10,
  },
  button: {
    borderColor: "cyan",
    borderWidth: 2,
    borderRadius: 3,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 5,
  },
  buttonText: {
    color: "#2e64e5",
  },
  animeContainer: {
    alignSelf: "stretch",
    marginVertical: 15,
    borderTopWidth: 5,
    borderTopColor: "navy",
  },
  removeButton: {
    backgroundColor: "red",
    minHeight: "100%",
  },
});
