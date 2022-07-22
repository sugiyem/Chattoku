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
import { ScrollContainer } from "../../styles/GeneralStyles";
import { itemContainerStyle } from "../../styles/ListStyles";

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
      <ScrollContainer>
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
              <ButtonText> Recent Posts </ButtonText>
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
            <DangerButton onPress={onDelete}>
              <DangerText>Delete Account</DangerText>
            </DangerButton>
          </ButtonGroup>
        </ContentContainer>

        <FavoriteStuffContainer>
          {datas.map((item, index) => (
            <ListItem.Accordion
              bottomDivider
              underlayColor="invisible"
              containerStyle={itemContainerStyle}
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
      </ScrollContainer>
    </Loading>
  );
};

export default ProfileHomeScreen;

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
  flex: 1;
  border-color: navy;
  border-width: 1px;
  border-radius: 5px;
  background-color: #44d0fe;
  padding-vertical: 8px;
  padding-horizontal: 12px;
  margin-horizontal: 5px;
`;

const DangerButton = styled.TouchableOpacity`
  flex: 1;
  border-color: whitesmoke;
  border-width: 1px;
  border-radius: 5px;
  background-color: #c10015;
  padding-vertical: 8px;
  padding-horizontal: 12px;
  margin-horizontal: 5px;
`;

const ButtonText = styled.Text`
  color: navy;
  text-align: center;
  font-weight: 600;
  font-size: 16px;
`;

const DangerText = styled.Text`
  color: whitesmoke;
  text-align: center;
  font-weight: 600;
  font-size: 16px;
`;

const Title = styled.Text`
  font-family: ${Platform.OS === "ios" ? "Gill Sans" : "serif"};
  font-size: 20px;
  font-weight: 600;
  text-decoration-line: underline;
`;
