import React, { useEffect, useState } from "react";
import {
  Button,
  ButtonText,
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

  const imgSource =
    friendData.img != ""
      ? { uri: friendData.img }
      : require("../../assets/default-profile.png");

  return (
    <ScrollContainer>
      <Button onPress={() => navigation.goBack()} testID="goBack">
        <ButtonText color="#000000">Go Back</ButtonText>
      </Button>

      <ProfileContainer>
        <RoundedImage source={imgSource} testID="profileImage" />
        <Name testID="name">{friendData.username}</Name>
        <Description testID="info">{friendData.bio}</Description>
      </ProfileContainer>

      <ListContainer>
        <FriendFavoriteLists />
      </ListContainer>
    </ScrollContainer>
  );
};

export default FriendInfoScreen;
