import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { Icon } from "react-native-elements";
import PostList from "../../components/Forum/ForumPost/PostList";
import { firebase } from "../../services/Firebase/Config";
import styled from "styled-components/native";
import { createContext, useEffect, useState } from "react";
import { isUserBanned } from "../../services/Forum/HandleBannedUsers";
import FetchPost from "../../services/Forum/FetchPost";
import ForumHeader from "../../components/Forum/ForumHeader";
import { isUserAdmin } from "../../services/Forum/HandleForumAdmin";
import ProfileOverlay from "../../components/Forum/ProfileOverlay";
import overlayContext from "./overlayContext";
import { PaddinglessContainer } from "../../styles/GeneralStyles";
import { ForumNavigation, NavigationText } from "../../styles/ForumStyles";

const ForumScreen = () => {
  const [isBanned, setIsBanned] = useState(false);
  const [posts, setPosts] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [popupData, setPopupData] = useState(null);
  const navigation = useNavigation();
  const data = navigation.getState().routes[1].params.data;
  const currentUID = firebase.auth().currentUser.uid;
  const isOwner = data.owner === currentUID;

  console.log(popupData);

  useEffect(() => {
    return isUserAdmin(data.id, currentUID, (data) => setIsAdmin(data.isFound));
  }, []);

  function handleAddButtonClick() {
    navigation.navigate("AddPost", { data: data });
  }

  function handleEditForumButton() {
    navigation.navigate("ManageForum", { data: data });
  }

  //Check for ban
  useEffect(() => {
    return isUserBanned(data.id, currentUID, (result) =>
      setIsBanned(result.isFound)
    );
  }, []);

  //retrieve posts
  useEffect(() => {
    return FetchPost(
      data.id,
      (data) => {
        data.sort((x, y) => (x.timestamp < y.timestamp ? 1 : -1));
        setPosts(data);
      },
      (error) => Alert.alert(error)
    );
  }, []);

  return (
    <>
      <overlayContext.Provider value={setPopupData}>
        {popupData && <ProfileOverlay userData={popupData} />}

        <PaddinglessContainer>
          <ForumNavigation onPress={() => navigation.goBack()}>
            <NavigationText>Go Back</NavigationText>
          </ForumNavigation>
          {(isOwner || isAdmin) && (
            <ForumNavigation onPress={handleEditForumButton}>
              <NavigationText>Manage Forum</NavigationText>
            </ForumNavigation>
          )}
          {/* <Header {...data} /> */}
          <PostList
            forumId={data.id}
            isOwner={isOwner}
            isBanned={isBanned}
            Header={() => <ForumHeader {...data} isOwner={isOwner} />}
            posts={posts}
          />
          {isBanned ? (
            <BannedText>You have been banned</BannedText>
          ) : (
            <Icon
              name="add"
              type="material"
              style={styles.add}
              color="#222"
              size={50}
              onPress={handleAddButtonClick}
            />
          )}
        </PaddinglessContainer>
      </overlayContext.Provider>
    </>
  );
};

export default ForumScreen;
const BannedText = styled.Text`
  border-radius: 10px;
  padding: 10px 30px;
  background-color: navy;
  margin: 10px;
  color: whitesmoke;
  font-size: 18px;
  font-weight: 500;
  text-align: center;
  border-width: 0.5px;
  border-color: whitesmoke;
`;

const styles = StyleSheet.create({
  add: {
    height: 70,
    width: 70,
    borderRadius: 100,
    borderColor: "black",
    borderWidth: 3,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-end"
  }
});
