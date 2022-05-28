import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ListItem } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { firebase } from "../../firebase/Config";
import FetchFavoriteAnime from "../../firebase/FetchFavoriteAnime";
import FetchUserInfo from "../../firebase/FetchUserInfo";
import RenderFavorites, {
  renderType,
} from "../../components/Profile/RenderFavorites";

const initialState = {
  username: "",
  bio: "",
  img: "",
  genres: [],
};

const ProfileHomeScreen = () => {
  const [userInfo, setUserInfo] = useState(initialState);
  const [favoriteAnime, setFavoriteAnime] = useState([]);
  const [animeExpanded, setAnimeExpanded] = useState(false);
  const [genreExpanded, setGenreExpanded] = useState(false);

  const navigation = useNavigation();

  const datas = [
    {
      title: "Favorite Genre",
      render: ({ items }) => (
        <RenderFavorites
          type={renderType.GENRE}
          items={items}
          navigation={navigation}
        />
      ),
      data: userInfo.genres,
      isExpanded: genreExpanded,
      changeExpanded: setGenreExpanded,
    },
    {
      title: "Favorite Anime",
      render: ({ items }) => (
        <RenderFavorites
          type={renderType.ANIME}
          items={items}
          navigation={navigation}
        />
      ),
      data: favoriteAnime,
      isExpanded: animeExpanded,
      changeExpanded: setAnimeExpanded,
    },
  ];

  async function logOut() {
    try {
      navigation.replace("Login");
      firebase.auth().signOut();
    } catch (error) {
      Alert.alert(error.message);
    }
  }

  useEffect(() => {
    return FetchUserInfo({
      onSuccesfulFetch: (userInfo) => {
        setUserInfo(userInfo);
      },
      onFailure: (error) => {
        Alert.alert(error.message);
      },
    });
  }, []);

  useEffect(() => {
    return FetchFavoriteAnime({
      onSuccesfulFetch: (favorite) => {
        setFavoriteAnime(favorite);
      },
      onFailure: (error) => {
        Alert.alert(error.message);
      },
    });
  }, []);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ alignItems: "center" }}
    >
      <View style={styles.contentContainer}>
        {userInfo.img.length > 0 ? (
          <Image style={styles.img} source={{ uri: userInfo.img }} />
        ) : (
          <Image
            style={styles.img}
            source={require("../../assets/default-profile.png")}
          />
        )}

        <Text style={styles.username}>{userInfo.username}</Text>
        <Text style={styles.bio}>{userInfo.bio}</Text>
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate("EditProfile", { userInfo: userInfo });
            }}
          >
            <Text style={styles.buttonText}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => logOut()}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </View>
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

export default ProfileHomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "darkcyan",
    padding: 5,
    flex: 1,
  },
  contentContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  favoriteStuffContainer: {
    alignSelf: "stretch",
    borderTopWidth: 1,
    borderTopColor: "black",
    margin: 10,
    padding: 5,
  },
  img: {
    height: 150,
    width: 150,
    borderRadius: 75,
  },
  username: {
    fontFamily: Platform.OS === "ios" ? "Gill Sans" : "serif",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
  bio: {
    fontSize: 15,
    fontWeight: "600",
    color: "aquamarine",
    textAlign: "center",
    marginBottom: 10,
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "stretch",
    marginBottom: 10,
  },
  button: {
    borderColor: "navy",
    borderWidth: 2,
    borderRadius: 3,
    backgroundColor: "white",
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 5,
  },
  buttonText: {
    color: "#2e64e5",
  },
  titleText: {
    fontFamily: Platform.OS === "ios" ? "Gill Sans" : "serif",
    fontSize: 20,
    fontWeight: "600",
    textDecorationLine: "underline",
  },
});
