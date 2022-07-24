import React, { useState } from "react";
import {
  Modal,
  Platform,
  Dimensions,
  TouchableOpacity,
  Alert
} from "react-native";
import styled from "styled-components/native";
import {
  pickImageFromCamera,
  pickImageFromLibrary,
  uploadImage
} from "../../services/Miscellaneous/HandleImage";

import { useNavigation } from "@react-navigation/native";
import { createForum, editForum } from "../../services/Forum/HandleForum";
import { imageType } from "../../constants/Image";
import { renderType } from "../../constants/Forum";
import {
  DarkButton,
  DarkButtonText,
  ForumNavigation,
  NavigationText,
  ScrollContainer
} from "../../styles/ForumStyles";

const initialForumInfo = {
  img: "",
  banner: "",
  title: "",
  desc: ""
};

const RenderManageForumDetails = ({ manageType }) => {
  const navigation = useNavigation();
  const initialState =
    manageType === renderType.CREATE
      ? initialForumInfo
      : navigation.getState().routes[1].params.data;
  const [forumInfo, setForumInfo] = useState(initialState);
  const [modalVisible, setModalVisible] = useState(false);
  const [uploadedImgType, setUploadedImgType] = useState(imageType.PROFILE);
  const isProfileUploaded = uploadedImgType === imageType.PROFILE;
  const uploadedImageAspect = isProfileUploaded ? [1, 1] : [2.5, 1];
  const submitButtonText =
    manageType === renderType.CREATE ? "Create Forum" : "Update Forum Data";

  function handleChangeText(text, name) {
    setForumInfo({
      ...forumInfo,
      [name]: text
    });
  }

  function handleUploadProfileClick() {
    setModalVisible(true);
    setUploadedImgType(imageType.PROFILE);
  }

  function handleUploadBannerClick() {
    setModalVisible(true);
    setUploadedImgType(imageType.BANNER);
  }

  function handlePickCameraImage() {
    pickImageFromCamera(handleImageUpload, uploadedImageAspect);
  }

  function handlePickLibraryImage() {
    pickImageFromLibrary(handleImageUpload, uploadedImageAspect);
  }

  function handleImageUpload(uri) {
    const uploadedImage = isProfileUploaded ? "img" : "banner";
    const successMessage = isProfileUploaded
      ? "Profile Has Been Updated Successfully"
      : "Banner Has Been Uploaded Successfully";
    uploadImage(
      uri,
      () => {},
      () => {},
      (newImgUrl) => handleChangeText(newImgUrl, uploadedImage),
      successMessage
    );
    setModalVisible(false);
  }

  const removeImage = () => {
    const removedField = isProfileUploaded ? "img" : "banner";
    setForumInfo({
      ...forumInfo,
      [removedField]: ""
    });
    setModalVisible(false);
  };

  const handleSubmit = () => {
    if (!forumInfo.title) {
      Alert.alert("Invalid Field", "Forum Title Can Not Be Empty");
      return;
    }

    manageType === renderType.CREATE
      ? createForum(forumInfo, () => navigation.navigate("ForumHome"))
      : editForum(forumInfo, () => {
          navigation.navigate("Forum", { data: forumInfo });
        });
  };
  return (
    <ScrollContainer>
      <Modal
        animationType="fade"
        visible={modalVisible}
        presentationStyle="pageSheet"
      >
        <ModalContainer>
          <ModalButton onPress={handlePickCameraImage} testID="pickFromCamera">
            <ButtonText>Take Photo</ButtonText>
          </ModalButton>
          <ModalButton
            onPress={handlePickLibraryImage}
            testID="pickFromLibrary"
          >
            <ButtonText>Choose From Library</ButtonText>
          </ModalButton>
          <ModalButton onPress={removeImage} testID="removeImage">
            <ButtonText>Remove Image</ButtonText>
          </ModalButton>
          <ModalButton onPress={() => setModalVisible(false)} testID="cancel">
            <ButtonText>Cancel</ButtonText>
          </ModalButton>
        </ModalContainer>
      </Modal>

      <ForumNavigation onPress={() => navigation.goBack()} testID="goBack">
        <NavigationText> Go Back </NavigationText>
      </ForumNavigation>
      <ImageContainer>
        <TouchableOpacity onPress={handleUploadBannerClick} testID="banner">
          <Banner
            source={
              forumInfo.banner.length > 0
                ? { uri: forumInfo.banner }
                : require("../../assets/default-banner.png")
            }
          />
        </TouchableOpacity>
        <ProfileContainer>
          <ProfileWrapper onPress={handleUploadProfileClick} testID="profile">
            <ProfilePicture
              source={
                forumInfo.img.length > 0
                  ? { uri: forumInfo.img }
                  : require("../../assets/default-profile.png")
              }
            />
          </ProfileWrapper>
        </ProfileContainer>
      </ImageContainer>
      <Title> Enter Forum Details </Title>
      <TextInputLabel> Title </TextInputLabel>
      <StyledTextInput
        onChangeText={(text) => handleChangeText(text, "title")}
        value={forumInfo.title}
        testID="titleInput"
      />
      <TextInputLabel> Description </TextInputLabel>
      <StyledTextInput
        onChangeText={(text) => handleChangeText(text, "desc")}
        value={forumInfo.desc}
        testID="descInput"
      />
      <DarkButton onPress={handleSubmit} testID="submit">
        <DarkButtonText> {submitButtonText} </DarkButtonText>
      </DarkButton>
    </ScrollContainer>
  );
};

export default RenderManageForumDetails;

const width = Dimensions.get("screen").width;

const Title = styled.Text`
  font-size: 24px;
  padding: 5px;
  font-weight: 400;
  text-decoration: underline;
  align-self: center;
  color: white;
`;

const Banner = styled.Image`
  width: ${width}px;
  height: ${(width * 2) / 5}px;
  border-width: 1px;
  border-color: black;
`;

const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 10px;
  margin: 20px;
`;

const ModalButton = styled.TouchableOpacity`
  align-self: stretch;
  border-radius: 10px;
  padding: 15px;
  background-color: cornflowerblue;
  margin-top: 10px;
`;

const ButtonText = styled.Text`
  justify-content: center;
  align-self: center;
  font-size: 15px;
  font-weight: bold;
  color: white;
`;

const ProfileWrapper = styled.TouchableOpacity`
  flex: 0;
  border-radius: 1000px;
`;

const ProfilePicture = styled.Image`
  align-self: center;
  height: 125px;
  width: 125px;
  top: -62.5px;
  border-width: 1px;
  border-color: black;
  position: absolute;
  border-radius: 75px;
`;

const ImageContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProfileContainer = styled.View`
  height: 60px;
  background-color: white;
`;

const TextInputLabel = styled.Text`
  font-family: ${Platform.OS === "ios" ? "Gill Sans" : "serif"};
  font-weight: bold;
  margin: 5px;
  margin-left: 20px;
  color: whitesmoke;
  font-size: 16px;
`;

const StyledTextInput = styled.TextInput`
  flex-direction: row;
  width: 90%;
  margin: 5px;
  padding: 5px 10px;
  border-radius: 5px;
  background-color: white;
  padding-bottom: 5px;
  align-self: center;
  font-size: 15px;
`;
