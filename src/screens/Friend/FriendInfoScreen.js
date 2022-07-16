import React, { useEffect, useState } from "react";
import {
  Button,
  ButtonText,
  GradientBackground,
  RoundedImage,
  ScrollContainer
} from "../../styles/GeneralStyles";
import {
  Description,
  Name,
  ListContainer,
  ProfileContainer
} from "../../styles/InfoStyles";
import { fetchFavoriteAnimeById } from "../../services/Profile/FetchUserInfo";
import { favoriteType } from "../../constants/Favorite";
import RenderFriendFavorites from "../../components/Friend/RenderFriendFavorites";

const FriendInfoScreen = ({ navigation, route }) => {
  const [favoriteAnime, setFavoriteAnime] = useState([]);

  const friendData = route.params.friendData;

  useEffect(() => {
    fetchFavoriteAnimeById(friendData.id, setFavoriteAnime);
  }, []);

  const sectionDetails = [
    {
      title: "Favorite Genre",
      type: favoriteType.GENRE,
      data: friendData.genres
    },
    {
      title: "Favorite Anime",
      type: favoriteType.ANIME,
      data: favoriteAnime
    }
  ];

  const FriendFavoriteLists = () =>
    sectionDetails.map((item, index) => (
      <RenderFriendFavorites key={index} {...item} />
    ));

  return (
    <GradientBackground>
      <ScrollContainer>
        <Button onPress={() => navigation.goBack()}>
          <ButtonText>Go Back</ButtonText>
        </Button>

        <ProfileContainer>
          {friendData.img != "" ? (
            <RoundedImage source={{ uri: friendData.img }} />
          ) : (
            <RoundedImage
              source={require("../../assets/default-profile.png")}
            />
          )}

          <Name>{friendData.username}</Name>
          <Description>{friendData.bio}</Description>
        </ProfileContainer>

        <ListContainer>
          <FriendFavoriteLists />
        </ListContainer>
      </ScrollContainer>
    </GradientBackground>
  );
};

export default FriendInfoScreen;
