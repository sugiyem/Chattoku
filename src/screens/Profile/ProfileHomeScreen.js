import React, { useEffect, useState } from "react";
import { Alert, Platform } from "react-native";
import { ListItem } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { firebase } from "../../services/Firebase/Config";
import { favoriteType } from "../../constants/Favorite";
import { deleteAccount } from "../../services/Authentication/HandleAuthentication";
import FetchFavoriteAnime from "../../services/Anime/FetchFavoriteAnime";
import FetchUserInfo from "../../services/Profile/FetchUserInfo";
import RenderFavorites from "../../components/Profile/RenderFavorites";
import styled from "styled-components/native";
import Loading from "../../components/Miscellaneous/Loading";
import Caution from "../../components/Miscellaneous/Caution";

const initialState = {
  username: "",
  bio: "",
  img: "",
  genres: []
};

const ProfileHomeScreen = () => {
  const [userInfo, setUserInfo] = useState(initialState);
  const [favoriteAnime, setFavoriteAnime] = useState([]);
  const [animeExpanded, setAnimeExpanded] = useState(false);
  const [genreExpanded, setGenreExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();

  const datas = [
    {
      title: "Favorite Genre",
      render: ({ items }) => (
        <RenderFavorites
          type={favoriteType.GENRE}
          items={items}
          navigation={navigation}
        />
      ),
      data: userInfo.genres,
      isExpanded: genreExpanded,
      changeExpanded: setGenreExpanded
    },
    {
      title: "Favorite Anime",
      render: ({ items }) => (
        <RenderFavorites
          type={favoriteType.ANIME}
          items={items}
          navigation={navigation}
        />
      ),
      data: favoriteAnime,
      isExpanded: animeExpanded,
      changeExpanded: setAnimeExpanded
    }
  ];

  async function logOut() {
    try {
      navigation.replace("Login");
      firebase.auth().signOut();
    } catch (error) {
      Alert.alert(error.message);
    }
  }

  function onDelete() {
    Caution("This account will be deleted", async () => {
      setIsLoading(true);
      await deleteAccount(
        () => {
          navigation.replace("Login");
          Alert.alert("Account has been deleted");
        },
        (error) => Alert.alert("Error", error.message)
      ).finally(() => setIsLoading(false));
    });
  }

  useEffect(() => {
    if (isLoading) {
      return;
    }

    return FetchUserInfo({
      onSuccesfulFetch: (userInfo) => {
        setUserInfo(userInfo);
      },
      onFailure: (error) => {
        Alert.alert(error.message);
      }
    });
  }, [isLoading]);

  useEffect(() => {
    if (isLoading) {
      return;
    }

    return FetchFavoriteAnime({
      onSuccesfulFetch: (favorite) => {
        setFavoriteAnime(favorite);
      },
      onFailure: (error) => {
        Alert.alert(error.message);
      }
    });
  }, [isLoading]);

  return (
    <Loading isLoading={isLoading}>
      <Container contentContainerStyle={{ alignItems: "center" }}>
        <ContentContainer>
          {userInfo.img.length > 0 ? (
            <ProfilePicture source={{ uri: userInfo.img }} />
          ) : (
            <ProfilePicture
              source={require("../../assets/default-profile.png")}
            />
          )}

          <Username>{userInfo.username}</Username>
          <Bio>{userInfo.bio}</Bio>
          <ButtonGroup>
            <Button
              onPress={() => {
                navigation.navigate("PastPosts");
              }}
            >
              <ButtonText> See Recent Posts </ButtonText>
            </Button>
            <Button
              onPress={() => {
                navigation.navigate("EditProfile", { userInfo: userInfo });
              }}
            >
              <ButtonText>Edit Profile</ButtonText>
            </Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button onPress={logOut}>
              <ButtonText>Logout</ButtonText>
            </Button>
            <Button onPress={onDelete}>
              <ButtonText>Delete Account</ButtonText>
            </Button>
          </ButtonGroup>
        </ContentContainer>

        <FavoriteStuffContainer>
          {datas.map((item, index) => (
            <ListItem.Accordion
              bottomDivider
              key={index}
              content={
                <ListItem.Content>
                  <ListItem.Title>
                    <Title>{item.title}</Title>
                  </ListItem.Title>
                </ListItem.Content>
              }
              isExpanded={item.isExpanded}
              onPress={() => item.changeExpanded(!item.isExpanded)}
            >
              {item.isExpanded && <item.render items={item.data} />}
            </ListItem.Accordion>
          ))}
        </FavoriteStuffContainer>
      </Container>
    </Loading>
  );
};

export default ProfileHomeScreen;

const Container = styled.ScrollView`
  background-color: darkcyan;
  padding: 5px;
  flex: 1;
`;

const ContentContainer = styled.View`
  align-items: center;
  justify-content: center;
  margin-top: 10px;
`;

const FavoriteStuffContainer = styled.View`
  align-self: stretch;
  border-top-width: 1px;
  border-top-color: black;
  margin: 10px;
  padding: 5px;
`;

const ProfilePicture = styled.Image`
  height: 150px;
  width: 150px;
  border-radius: 75px;
`;

const Username = styled.Text`
  font-family: ${Platform.OS === "ios" ? "Gill Sans" : "serif"};
  font-size: 20px;
  font-weight: bold;
  text-align=center;
  margin-vertical: 10px;
`;

const Bio = styled.Text`
  font-size: 15px;
  font-weight: 600;
  color: aquamarine;
  text-align: center;
  margin-bottom: 10px;
`;

const ButtonGroup = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

const Button = styled.TouchableOpacity`
  border-color: navy;
  border-width: 2px;
  border-radius: 3px;
  background-color: white;
  padding-vertical: 8px;
  padding-horizontal: 12px;
  margin-horizontal: 5px;
`;

const ButtonText = styled.Text`
  color: #2e64e5;
`;

const Title = styled.Text`
  font-family: ${Platform.OS === "ios" ? "Gill Sans" : "serif"};
  font-size: 20px;
  font-weight: 600;
  text-decoration-line: underline;
`;
