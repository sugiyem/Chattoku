import React, { useState } from "react";
import { Modal, Platform, Dimensions } from "react-native";
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
    const removedField =
      uploadedImgType === isProfileUploaded ? "img" : "banner";
    setForumInfo({
      ...forumInfo,
      [removedField]: ""
    });
    setModalVisible(false);
  };

  const handleSubmit = () => {
    manageType === renderType.CREATE
      ? createForum(forumInfo, () => navigation.navigate("ForumHome"))
      : editForum(forumInfo, () => {
          navigation.navigate("Forum", { data: forumInfo });
        });
  };
  return (
    <Container>
      <Modal
        animationType="fade"
        visible={modalVisible}
        presentationStyle="pageSheet"
      >
        <ModalContainer>
          <ModalButton onPress={handlePickCameraImage}>
            <ButtonText>Take Photo</ButtonText>
          </ModalButton>
          <ModalButton onPress={handlePickLibraryImage}>
            <ButtonText>Choose From Library</ButtonText>
          </ModalButton>
          <ModalButton onPress={removeImage}>
            <ButtonText>Remove Image</ButtonText>
          </ModalButton>
          <ModalButton onPress={() => setModalVisible(false)}>
            <ButtonText>Cancel</ButtonText>
          </ModalButton>
        </ModalContainer>
      </Modal>

      <BackButton onPress={() => navigation.goBack()}>
        <BackButtonText> Go Back </BackButtonText>
      </BackButton>
      <Title> Enter Forum Details </Title>
      <ImageContainer>
        {forumInfo.banner.length > 0 ? (
          <Banner source={{ uri: forumInfo.banner }} />
        ) : (
          <Banner source={require("../../assets/default-banner.png")} />
        )}
      </ImageContainer>
      <CustomButton onPress={handleUploadBannerClick}>
        <ButtonText> Upload Banner </ButtonText>
      </CustomButton>
      <ImageContainer>
        {forumInfo.img.length > 0 ? (
          <ProfilePicture source={{ uri: forumInfo.img }} />
        ) : (
          <ProfilePicture
            source={require("../../assets/default-profile.png")}
          />
        )}
      </ImageContainer>
      <CustomButton onPress={handleUploadProfileClick}>
        <ButtonText> Upload Image </ButtonText>
      </CustomButton>
      <TextInputLabel> Title </TextInputLabel>
      <StyledTextInput
        onChangeText={(text) => handleChangeText(text, "title")}
        value={forumInfo.title}
      />
      <TextInputLabel> Description </TextInputLabel>
      <StyledTextInput
        onChangeText={(text) => handleChangeText(text, "desc")}
        value={forumInfo.desc}
      />
      <CustomButton onPress={handleSubmit}>
        <ButtonText> {submitButtonText} </ButtonText>
      </CustomButton>
    </Container>
  );
};

export default RenderManageForumDetails;

const width = Dimensions.get("screen").width;

const Title = styled.Text`
  font-size: 22px;
  padding: 5px;
  font-weight: 400;
  align-self: center;
  color: white;
`;

const Banner = styled.Image`
  width: ${width - 20}px;
  height: ${(width * 2) / 5 - 8}px;
`;

const Container = styled.ScrollView`
  display: flex;
  background-color: darkcyan;
  padding: 5px;
  flex: 1;
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

const ProfilePicture = styled.Image`
  margin-top: 30px;
  align-self: center;
  height: 125px;
  width: 125px;
  border-radius: 75px;
`;

const ImageContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const CustomButton = styled.TouchableOpacity`
  align-self: stretch;
  border-radius: 10px;
  padding: 15px;
  background-color: navy;
  margin: 20px;
`;

const TextInputLabel = styled.Text`
  font-family: ${Platform.OS === "ios" ? "Gill Sans" : "serif"};
  font-weight: bold;
  text-decoration-line: underline;
  margin: 5px;
  align-self: center;
`;

const StyledTextInput = styled.TextInput`
  flex-direction: row;
  width: 90%;
  margin: 5px;
  padding-left: 10px;
  border-radius: 5px;
  background-color: white;
  padding-bottom: 5px;
  align-self: center;
`;

const BackButton = styled.TouchableOpacity`
  align-self: stretch;
  border-radius: 10px;
  border-width: 1px;
  background-color: aquamarine;
  padding: 5px;
  margin-top: 10px;
`;

const BackButtonText = styled.Text`
  text-align: center;
  color: blue;
`;
