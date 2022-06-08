import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { ListItem } from "react-native-elements";

import { firebase } from "../../firebase/Config";
import { favoriteType } from "../../constants/Favorite";
import RenderFriendFavorites from "../../components/Friend/RenderFriendFavorites";

const FriendInfoScreen = ({ navigation, route }) => {
  const [favoriteAnime, setFavoriteAnime] = useState([]);
  const [animeExpanded, setAnimeExpanded] = useState(false);
  const [genreExpanded, setGenreExpanded] = useState(false);

  const datas = [
    {
      title: "Favorite Genre",
      render: ({ items }) => (
        <RenderFriendFavorites type={favoriteType.GENRE} items={items} />
      ),
      data: route.params.friendData.genres,
      isExpanded: genreExpanded,
      changeExpanded: setGenreExpanded
    },
    {
      title: "Favorite Anime",
      render: ({ items }) => (
        <RenderFriendFavorites type={favoriteType.ANIME} items={items} />
      ),
      data: favoriteAnime,
      isExpanded: animeExpanded,
      changeExpanded: setAnimeExpanded
    }
  ];

  useEffect(() => {
    const friendID = route.params.friendData.id;

    return firebase
      .firestore()
      .collection("users")
      .doc(friendID)
      .collection("anime")
      .onSnapshot(
        (querySnapshot) => {
          const favoriteAnimeData = [];

          querySnapshot.forEach((documentSnapshot) => {
            favoriteAnimeData.push(documentSnapshot.data());
          });

          setFavoriteAnime(favoriteAnimeData);
        },
        (error) => Alert.alert("Error", error.message)
      );
  }, []);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ alignItems: "center" }}
    >
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>

      <View style={styles.contentContainer}>
        {route.params.friendData.img.length > 0 ? (
          <Image
            style={styles.img}
            source={{ uri: route.params.friendData.img }}
          />
        ) : (
          <Image
            style={styles.img}
            source={require("../../assets/default-profile.png")}
          />
        )}

        <Text style={styles.username}>{route.params.friendData.username}</Text>
        <Text style={styles.bio}>{route.params.friendData.bio}</Text>
      </View>

      <View style={styles.favoriteStuffContainer}>
        {datas.map((item, index) => (
          <ListItem.Accordion
            bottomDivider
            key={index}
            content={
              <ListItem.Content>
                <ListItem.Title>
                  <Text style={styles.titleText}>{item.title}</Text>
                </ListItem.Title>
              </ListItem.Content>
            }
            isExpanded={item.isExpanded}
            onPress={() => item.changeExpanded(!item.isExpanded)}
          >
            {item.isExpanded && <item.render items={item.data} />}
          </ListItem.Accordion>
        ))}
      </View>
    </ScrollView>
  );
};

export default FriendInfoScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "darkcyan",
    padding: 5,
    flex: 1
  },
  contentContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10
  },
  favoriteStuffContainer: {
    alignSelf: "stretch",
    borderTopWidth: 1,
    borderTopColor: "black",
    margin: 10,
    padding: 5
  },
  img: {
    height: 150,
    width: 150,
    borderRadius: 75
  },
  username: {
    fontFamily: Platform.OS === "ios" ? "Gill Sans" : "serif",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10
  },
  bio: {
    fontSize: 15,
    fontWeight: "600",
    color: "aquamarine",
    textAlign: "center",
    marginBottom: 10
  },
  button: {
    borderColor: "navy",
    borderWidth: 1,
    borderRadius: 10,
    alignSelf: "stretch",
    backgroundColor: "aquamarine",
    padding: 5,
    margin: 5
  },
  buttonText: {
    color: "#2e64e5",
    textAlign: "center"
  },
  titleText: {
    fontFamily: Platform.OS === "ios" ? "Gill Sans" : "serif",
    fontSize: 20,
    fontWeight: "600",
    textDecorationLine: "underline"
  }
});
