import React, { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { CheckBox } from "react-native-elements";
import { firebase } from "../../firebase/Config";
import { GENRES } from "../../constants/MyAnimeList";
import RenderFavorites from "../../components/Profile/RenderFavorites";

const EditGenreScreen = () => {
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState([]);
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
          setFavorites(documentSnapshot.data().genres);
        },
        (error) => {
          Alert.alert(error.message);
        }
      );
  }, []);

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
        <RenderFavorites
          type="Genre"
          isEditPage={true}
          items={GENRES.filter((value) =>
            value.toLowerCase().startsWith(search.toLowerCase())
          ).filter((value) =>
            favorites.includes(value) ? includeFav : includeNonFav
          )}
          favorites={favorites}
        />
      </View>
    </ScrollView>
  );
};

export default EditGenreScreen;

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
});
