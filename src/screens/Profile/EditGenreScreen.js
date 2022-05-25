import React, { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Button, CheckBox, ListItem } from "react-native-elements";
import { firebase } from "../../firebase/Config";
import { GENRES } from "../../constants/MyAnimeList";

const EditGenreScreen = () => {
  const [search, setSearch] = useState("");
  const [favorite, setFavorite] = useState([]);
  const [includeFav, setIncludeFav] = useState(true);
  const [includeNonFav, setIncludeNonFav] = useState(true);

  useEffect(() => {
    const userID = firebase.auth().currentUser.uid;

    return firebase
      .firestore()
      .collection("users")
      .doc(userID)
      .onSnapshot(
        (documentSnapshot) => {
          setFavorite(documentSnapshot.data().genres);
        },
        (error) => {
          Alert.alert(error.message);
        }
      );
  }, []);

  const RenderGenres = ({ items }) => {
    const leftButton = (item) => {
      if (favorite.includes(item)) {
        return (
          <Button
            title="Remove"
            buttonStyle={styles.removeButton}
            icon={{ name: "delete", color: "white" }}
            onPress={() => {
              removeGenreFromFavorite(item);
            }}
          />
        );
      } else {
        return (
          <Button
            title="Add"
            buttonStyle={styles.addButton}
            icon={{ name: "add", color: "white" }}
            onPress={() => {
              addGenreToFavorite(item);
            }}
          />
        );
      }
    };

    return (
      <View>
        {items.map((item, i) => (
          <ListItem.Swipeable key={i} rightContent={leftButton(item)}>
            <ListItem.Content>
              <ListItem.Title>{item}</ListItem.Title>
              <ListItem.Subtitle>
                {favorite.includes(item) ? "Favorite" : ""}
              </ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem.Swipeable>
        ))}
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <TextInput
        value={search}
        onChangeText={(text) => setSearch(text)}
        placeholder="search"
        style={styles.textInput}
      />
      <CheckBox
        title="Include favorite"
        checked={includeFav}
        onPress={() => {
          setIncludeFav(!includeFav);
        }}
      />
      <CheckBox
        title="Include non-favorite"
        checked={includeNonFav}
        onPress={() => {
          setIncludeNonFav(!includeNonFav);
        }}
      />
      <Text style={styles.title}>Genre lists</Text>
      <View>
        <RenderGenres
          items={GENRES.filter((value) =>
            value.toLowerCase().startsWith(search.toLowerCase())
          ).filter((value) =>
            favorite.includes(value) ? includeFav : includeNonFav
          )}
        />
      </View>
    </ScrollView>
  );
};

export default EditGenreScreen;

async function addGenreToFavorite(item) {
  await firebase
    .firestore()
    .collection("users")
    .doc(firebase.auth().currentUser.uid)
    .update({
      genres: firebase.firestore.FieldValue.arrayUnion(item),
    })
    .then(() => {
      Alert.alert("Genre succesfully added to favorite");
    })
    .catch((error) => Alert.alert(error.message));
}

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
  title: {
    fontFamily: "serif",
    fontSize: 30,
    fontWeight: "bold",
  },
  tableContainer: {
    alignSelf: "stretch",
    margin: 10,
    padding: 5,
  },
  addButton: {
    minHeight: "100%",
    backgroundColor: "green",
  },
  removeButton: {
    minHeight: "100%",
    backgroundColor: "red",
  },
});
