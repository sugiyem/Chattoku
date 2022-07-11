import React from "react";
import { Modal } from "react-native";
import styled from "styled-components/native";
import {
  pickImageFromCamera,
  pickImageFromLibrary,
  removeImageFromCloudStorage,
  uploadImage
} from "../../services/Miscellaneous/HandleImage";

const UploadImageModal = ({
  isVisible,
  onClose,
  removeImage,
  currentImage,
  initialImage,
  setImage,
  updateLoadingState
}) => {
  async function handleUpload(imgUrl) {
    onClose();
    await uploadImage(
      imgUrl,
      () => updateLoadingState(true),
      () => updateLoadingState(false),
      async (newImgUrl) => {
        const prevImage = currentImage;
        setImage(newImgUrl);

        if (prevImage !== initialImage) {
          await removeImageFromCloudStorage(prevImage);
        }
      }
    );
  }

  return (
    <Modal
      animationType="fade"
      visible={isVisible}
      onRequestClose={onClose}
      presentationStyle="pageSheet"
    >
      <ModalContainer>
        <ModalButton onPress={() => pickImageFromCamera(handleUpload)}>
          <EditButtonText>Take Photo</EditButtonText>
        </ModalButton>
        <ModalButton onPress={() => pickImageFromLibrary(handleUpload)}>
          <EditButtonText>Choose From Library</EditButtonText>
        </ModalButton>
        <ModalButton onPress={removeImage}>
          <EditButtonText>Remove Image</EditButtonText>
        </ModalButton>
        <ModalButton onPress={onClose}>
          <EditButtonText>Cancel</EditButtonText>
        </ModalButton>
      </ModalContainer>
    </Modal>
  );
};

export default UploadImageModal;

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
  background-color: #6495ed;
  margin-top: 10px;
`;

const EditButtonText = styled.Text`
  justify-content: center;
  align-self: center;
  font-size: 15px;
  font-weight: bold;
  color: #ffffff;
`;
