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

const RenderFavoriteAnime = ({ items, navigation }) => {
  const RemoveButton = ({ item }) => (
    <Button
      title="Remove"
      icon={{ name: "delete", color: "white" }}
      buttonStyle={styles.removeButton}
      onPress={() => {
        removeAnimeFromFavorite(item);
      }}
    />
  );

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Anime");
        }}
        style={styles.favoriteButton}
      >
        <Text style={styles.buttonText}>Add more favorite anime</Text>
      </TouchableOpacity>
      {items.map((item, index) => (
        <ListItem.Swipeable
          key={index}
          rightContent={<RemoveButton item={item} />}
        >
          <Avatar source={{ uri: item.image }} />
          <ListItem.Content>
            <ListItem.Title>{item.title}</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem.Swipeable>
      ))}
    </View>
  );
  {
    /*<FlatList
      persistentScrollbar
      data={items}
      contentContainerStyle={{ flexGrow: 1 }}
      renderItem={({ item, index }) => (
        <ListItem.Swipeable key={index} rightContent={<RemoveButton item />}>
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
          style={styles.favoriteButton}
        >
          <Text style={styles.buttonText}>Add more favorite anime</Text>
        </TouchableOpacity>
      }
    />*/
  }
};

const RenderFavoriteGenre = ({ items, navigation }) => {
  const RemoveButton = ({ item }) => (
    <Button
      title="Remove"
      icon={{ name: "delete", color: "white" }}
      buttonStyle={styles.removeButton}
      onPress={() => {
        removeGenreFromFavorite(item);
      }}
    />
  );

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("EditGenre");
        }}
        style={styles.favoriteButton}
      >
        <Text style={styles.buttonText}>Add more favorite genre</Text>
      </TouchableOpacity>
      {items.map((item, index) => (
        <ListItem.Swipeable
          key={index}
          bottomDivider
          rightContent={<RemoveButton item={item} />}
        >
          <ListItem.Content>
            <ListItem.Title>{item}</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem.Swipeable>
      ))}
    </View>
  );

  {
    /*<FlatList
      persistentScrollbar
      data={items}
      contentContainerStyle={{ flexGrow: 1 }}
      renderItem={({ item, index }) => (
        <ListItem.Swipeable key={index} rightContent={<RemoveButton item />}>
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
          style={styles.favoriteButton}
        >
          <Text style={styles.buttonText}>Add more favorite genre</Text>
        </TouchableOpacity>
      }
    />*/
  }
};

const ProfileHomeScreen = () => {
  const [userInfo, setUserInfo] = useState(initialState);
  const [favoriteAnime, setFavoriteAnime] = useState([]);
  const [animeExpanded, setAnimeExpanded] = useState(false);
  const [genreExpanded, setGenreExpanded] = useState(false);

  const datas = [
    {
      title: "Favorite Genre",
      render: RenderFavoriteGenre,
      data: userInfo.genres,
      isExpanded: genreExpanded,
      changeExpanded: setGenreExpanded,
    },
    {
      title: "Favorite Anime",
      render: RenderFavoriteAnime,
      data: favoriteAnime,
      isExpanded: animeExpanded,
      changeExpanded: setAnimeExpanded,
    },
  ];

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
          const doc = documentSnapshot.data();

          setUserInfo({
            username: doc.username,
            bio: doc.bio,
            img: doc.img,
            genres: doc.genres,
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
            {item.isExpanded && (
              <item.render items={item.data} navigation={navigation} />
            )}
          </ListItem.Accordion>
        ))}
        {/*<FlatList
          persistentScrollbar
          data={datas}
          renderItem={({ item, index }) => (
            <ListItem.Accordion
              bottomDivider
              key={index}
              content={
                <ListItem.Content>
                  <ListItem.Title>
                    <Text>{item.title}</Text>
                  </ListItem.Title>
                </ListItem.Content>
              }
              isExpanded={item.isExpanded}
              onPress={() => item.changeExpanded(!item.isExpanded)}
            >
              {item.isExpanded && (
                <item.render items={item.data} navigation={navigation} />
              )}
            </ListItem.Accordion>
          )}
              />*/}

        {/*<FlatList
          data={userInfo.genres}
          renderItem={({ item, index }) => {
            const RemoveButton = ({ item }) => (
              <Button
                title="Remove"
                icon={{ name: "delete", color: "white" }}
                buttonStyle={styles.removeButton}
                onPress={() => {
                  removeGenreFromFavorite(item);
                }}
              />
            );

            return (
              <ListItem.Swipeable
                key={index}
                rightContent={<RemoveButton item />}
                bottomDivider
              >
                <ListItem.Content>
                  <ListItem.Title>{item}</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
              </ListItem.Swipeable>
            );
          }}
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
          userInfo.genres.map((item, i) => {
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
          })
        </View>
        </ListItem.Accordion>*/}

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
      </View>
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
    fontFamily: "serif",
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
  favoriteButton: {
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 3,
    backgroundColor: "aquamarine",
    margin: 5,
    padding: 5,
  },
  removeButton: {
    backgroundColor: "red",
    minHeight: "100%",
  },
  titleText: {
    fontFamily: "serif",
    fontSize: 20,
    fontWeight: "600",
    textDecorationLine: "underline",
  },
});
