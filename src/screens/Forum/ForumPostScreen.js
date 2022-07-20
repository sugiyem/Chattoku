import { useNavigation } from "@react-navigation/native";
import { Text, LogBox } from "react-native";
import { useState, useEffect, useContext } from "react";
import CommentList from "../../components/Forum/ForumComment/CommentList";
import LikeBar from "../../components/Forum/ForumPost/LikeBar";
import styled from "styled-components/native";
import { FetchInfoById } from "../../services/Profile/FetchUserInfo";
import overlayContext from "./overlayContext";
import ProfileOverlay from "../../components/Forum/ProfileOverlay";
import ImageSlider from "../../components/Miscellaneous/ImageSlider";
import { PaddinglessContainer } from "../../styles/GeneralStyles";
import {
  AquaButton,
  AquaButtonText,
  BannedText,
  ForumNavigation,
  NavigationText
} from "../../styles/ForumStyles";
import MainPostCard from "../../components/Forum/ForumPost/MainPostCard";

//Temporarily disable log (Because I don't know the cause of the warning)
// LogBox.ignoreAllLogs();

const ForumPostScreen = () => {
  const navigation = useNavigation();
  const [popupData, setPopupData] = useState(null);
  const [data] = useState(navigation.getState().routes[2].params.data);
  console.log(data);

  function handleAddButtonClick() {
    navigation.navigate("AddComment", { data: data });
  }

  function RenderHeader() {
    return (
      <>
        <MainPostCard {...data} />

        <TextContainer>
          <StyledText> Comments </StyledText>
        </TextContainer>
      </>
    );
  }

  return (
    <overlayContext.Provider value={setPopupData}>
      {popupData && <ProfileOverlay userData={popupData} />}
      <PaddinglessContainer>
        <ForumNavigation onPress={() => navigation.goBack()} testID="goBack">
          <NavigationText>Go Back</NavigationText>
        </ForumNavigation>

        <CommentList {...data} Header={RenderHeader} />

        {data.isBanned ? (
          <BannedText> You have been banned</BannedText>
        ) : (
          <AquaButton onPress={handleAddButtonClick} testID="addComment">
            <AquaButtonText>Add Your Comment</AquaButtonText>
          </AquaButton>
        )}
      </PaddinglessContainer>
    </overlayContext.Provider>
  );
};

export default ForumPostScreen;

const TextContainer = styled.View`
  margin: 5px;
  margin-top: 15px;
  padding: 5px;
  align-self: stretch;
  border-top-width: 1px;
`;

const StyledText = styled.Text`
  font-size: 20px;
  font-weight: 600;
  text-decoration-line: underline;
  color: whitesmoke;
  text-align: center;
`;
