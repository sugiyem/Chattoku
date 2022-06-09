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
import { CheckBox } from "react-native-elements";
import { GENRES } from "../../constants/MyAnimeList";
import { favoriteType } from "../../constants/Favorite";
import FetchUserInfo from "../../firebase/FetchUserInfo";
import RenderFavorites from "../../components/Profile/RenderFavorites";

const EditGenreScreen = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [includeFav, setIncludeFav] = useState(true);
  const [includeNonFav, setIncludeNonFav] = useState(true);

  useEffect(() => {
    return FetchUserInfo({
      onSuccesfulFetch: (data) => {
        setFavorites(data.genres);
      },
      onFailure: (error) => {
        Alert.alert(error.message);
      }
    });
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

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Go back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Genre lists</Text>
      <View>
        <RenderFavorites
          type={favoriteType.GENRE}
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
    flex: 1
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
  title: {
    fontFamily: Platform.OS === "ios" ? "Gill Sans" : "serif",
    fontSize: 30,
    fontWeight: "bold"
  },
  button: {
    borderRadius: 10,
    borderWidth: 1,
    padding: 5,
    marginVertical: 5,
    backgroundColor: "aquamarine"
  },
  buttonText: {
    textAlign: "center",
    color: "blue"
  }
});
