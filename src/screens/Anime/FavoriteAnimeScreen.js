import React, { useEffect, useState } from "react";
import { Alert, Dimensions, StyleSheet } from "react-native";
import { Avatar, Icon, ListItem } from "react-native-elements";
import {
  Button,
  ButtonText,
  CenteredBoldText,
  ScrollContainer
} from "../../styles/GeneralStyles";
import FetchFavoriteAnime from "../../services/Anime/FetchFavoriteAnime";
import styled from "styled-components/native";

const FavoriteAnimeScreen = ({ navigation }) => {
  const [anime, setAnime] = useState([]);

  const goToRecommendationPage = (item) => {
    navigation.navigate("FavAnimeRecommendation", { anime: item });
  };

  const RenderItems = ({ item, idx }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
      <ListItem.Accordion
        key={idx}
        bottomDivider
        content={<RenderTab item={item} />}
        isExpanded={isExpanded}
        onPress={() => setIsExpanded(!isExpanded)}
        style={styles.card}
      >
        {isExpanded && (
          <RenderAccordion item={item} testID={item.id.toString()} />
        )}
      </ListItem.Accordion>
    );
  };

  const RenderAccordion = ({ item, testID }) => (
    <AccordionContainer
      onPress={() => goToRecommendationPage(item)}
      testID={testID}
    >
      <Icon name="search" size={30} color="green" />
      <AccordionText>Get similar anime</AccordionText>
    </AccordionContainer>
  );

  const RenderTab = ({ item }) => (
    <>
      <Avatar
        size="medium"
        source={{ uri: item.image }}
        containerStyle={styles.imageContainer}
      />
      <Title>{item.title}</Title>
    </>
  );

  useEffect(() => {
    return FetchFavoriteAnime({
      onSuccesfulFetch: (data) => {
        setAnime(data);
      },
      onFailure: (error) => {
        Alert.alert("Error", error.message);
      }
    });
  }, []);

  return (
    <ScrollContainer>
      <CenteredBoldText size="20px">Favorite Anime List</CenteredBoldText>

      <Button onPress={() => navigation.goBack()} testID="backButton">
        <ButtonText>Go Back</ButtonText>
      </Button>

      <MarginView>
        {anime.map((item, idx) => (
          <RenderItems key={item.id.toString()} item={item} idx={idx} />
        ))}
      </MarginView>
    </ScrollContainer>
  );
};

export default FavoriteAnimeScreen;

const AccordionContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin: 15px;
  padding: 20px;
  border-radius: 100px;
  border-width: 1px;
  border-color: black;
  background-color: whitesmoke;
`;

const AccordionText = styled.Text`
  font-size: 16px;
  align-items: center;
  margin-left: 10px;
`;

const MarginView = styled.View`
  margin: 20px 5px;
`;

const Title = styled.Text`
  flex: 1;
  margin-left: 10px;
  font-size: 18px;
`;

const width = Dimensions.get("screen").width;

const styles = StyleSheet.create({
  imageContainer: {
    marginRight: 10,
    width: width / 5,
    height: undefined,
    aspectRatio: 3 / 4
  },
  card: {
    borderColor: "black",
    borderWidth: 0.5
  }
});
