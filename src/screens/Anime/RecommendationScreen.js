import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  TouchableOpacity,
  View
} from "react-native";
import { Button, ButtonText, Container } from "../../styles/GeneralStyles";
import FetchUserInfo from "../../services/Profile/FetchUserInfo";

const RecommendationScreen = ({ navigation }) => {
  const [genres, setGenres] = useState([]);
  const [isGenreLoaded, setIsGenreLoaded] = useState(false);

  useEffect(() => {
    setIsGenreLoaded(false);

    return FetchUserInfo({
      onSuccesfulFetch: (data) => {
        setGenres(data.genres);
        setIsGenreLoaded(true);
      },
      onFailure: (error) => {
        Alert.alert("Error", error.message);
      }
    });
  }, []);

  if (!isGenreLoaded) {
    return (
      <Container>
        <ActivityIndicator size="large" />
      </Container>
    );
  }

  return (
    <Container>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <ButtonText>Go Back</ButtonText>
      </TouchableOpacity>

      <View style={styles.buttonsContainer}>
        <Button onPress={() => navigation.navigate("FavoriteAnime")} pad="20px">
          <ButtonText size="20px">
            Check recommendation from your favorite anime
          </ButtonText>
        </Button>

        <Button
          onPress={() =>
            navigation.navigate("FavGenreRecommendation", {
              genres: genres
            })
          }
          pad="20px"
        >
          <ButtonText size="20px">
            Check recommendation from your favorite genre
          </ButtonText>
        </Button>
      </View>
    </Container>
  );
};

export default RecommendationScreen;

const styles = StyleSheet.create({
  backButton: {
    alignSelf: "stretch",
    justifyContent: "flex-start",
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: "cyan",
    margin: 5,
    padding: 5
  },
  buttonsContainer: {
    justifyContent: "center",
    flex: 1
  }
});
