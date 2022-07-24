import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import { ButtonText, Container } from "../../styles/GeneralStyles";
import FetchUserInfo from "../../services/Profile/FetchUserInfo";
import Loading from "../../components/Miscellaneous/Loading";
import styled from "styled-components/native";

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

  const isPageLoading = !isGenreLoaded;

  const RenderPage = () => (
    <Container>
      <BackButton onPress={() => navigation.goBack()} testID="backButton">
        <ButtonText>Go Back</ButtonText>
      </BackButton>

      <ButtonContainer>
        <Options
          onPress={() => navigation.navigate("FavoriteAnime")}
          testID="animeButton"
        >
          <OptionText>Check recommendation from your favorite anime</OptionText>
        </Options>

        <Options
          onPress={() =>
            navigation.navigate("FavGenreRecommendation", {
              genres: genres
            })
          }
          testID="genreButton"
        >
          <OptionText>Check recommendation from your favorite genre</OptionText>
        </Options>
      </ButtonContainer>
    </Container>
  );

  return (
    <Loading isLoading={isPageLoading}>
      <RenderPage />
    </Loading>
  );
};

export default RecommendationScreen;

const BackButton = styled.TouchableOpacity`
  align-self: stretch;
  justify-content: flex-start;
  border-radius: 10px;
  border-width: 1px;
  background-color: cyan;
  margin: 5px;
  padding: 5px;
`;

const ButtonContainer = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Options = styled.TouchableOpacity`
  margin: 15px;
  padding: 20px;
  background-color: #44d0fe;
  border-radius: 20px;
  border-color: navy;
  border-width: 2px;
`;

const OptionText = styled.Text`
  font-size: 22px;
  color: navy;
  text-align: center;
`;
