import React, { useState } from "react";
import styled from "styled-components/native";
import { Alert, Dimensions, Platform } from "react-native";
import {
  BoldText,
  Button,
  ButtonText,
  Container
} from "../../styles/GeneralStyles";
import {
  isUsernameTaken,
  isValidUsername
} from "../../services/Authentication/CheckUsername";
import {
  createGroup,
  editGroupDetails
} from "../../services/Friend/HandleGroup";
import { writeSectionType } from "../../constants/Miscellaneous";
import { updateUserInfo } from "../../services/Profile/HandleUpdateInfo";
import Loading from "./Loading";
import UploadImageModal from "./UploadImageModal";
import { removeImageFromCloudStorage } from "../../services/Miscellaneous/HandleImage";

const EditSection = ({ type, currentState, navigation }) => {
  const [info, setInfo] = useState(currentState);
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const initialUsername = currentState.username;
  const initialImage = currentState.img;

  const isEditProfile = type === writeSectionType.EDIT_PROFILE;
  const isEditGroup = type === writeSectionType.EDIT_GROUP;

  function handleChangeText(text, name) {
    setInfo({
      ...info,
      [name]: text
    });
  }

  async function removeImage() {
    if (info.img !== initialImage) {
      setIsLoading(true);
      await removeImageFromCloudStorage(info.img);
    }

    setIsLoading(false);
    setInfo({
      ...info,
      img: ""
    });
    setModalVisible(false);
  }

  function closeModal() {
    setModalVisible(false);
  }

  async function handleSubmit() {
    if (isEditProfile) {
      setIsLoading(true);
      if (info.username !== initialUsername) {
        const isUsernameNotAvailable = await isUsernameTaken(info.username);
        if (!isValidUsername(info.username)) {
          setIsLoading(false);
          Alert.alert(
            "username must only contains alphanumeric characters" +
              "and must at least be 1 character long"
          );
          return;
        } else if (isUsernameNotAvailable) {
          setIsLoading(false);
          Alert.alert("username is not available");
          return;
        }
      }

      await updateUserInfo({
        newData: info,
        onSuccess: async () => {
          if (info.img !== initialImage) {
            await removeImageFromCloudStorage(initialImage);
          }

          setIsLoading(false);
          navigation.navigate("ProfileHome");
        },
        onError: (error) => {
          setIsLoading(false);
          Alert.alert("Error", error.message);
        }
      });
    } else {
      if (!isGroupNameValid(info.name)) {
        Alert.alert("Invalid group name");
        return;
      }

      if (isEditGroup) {
        setIsLoading(true);
        await editGroupDetails(info.id, info.name, info.description, info.img)
          .then(async () => {
            if (info.img !== initialImage) {
              await removeImageFromCloudStorage(initialImage);
            }
          })
          .finally(() => {
            setIsLoading(false);
            navigation.replace("GroupInfo", {
              groupData: info
            });
          });
      } else {
        setIsLoading(true);
        await createGroup(info.name, info.description, info.img).finally(() => {
          setIsLoading(false);
          navigation.replace("GroupList");
        });
      }
    }
  }

  return (
    <Loading isLoading={isLoading}>
      <Container>
        <UploadImageModal
          isVisible={modalVisible}
          onClose={closeModal}
          removeImage={removeImage}
          currentImage={info.img}
          initialImage={initialImage}
          setImage={(imgUrl) => handleChangeText(imgUrl, "img")}
          updateLoadingState={setIsLoading}
        />

        <Button
          onPress={async () => {
            if (info.img !== initialImage) {
              setIsLoading(true);
              await removeImageFromCloudStorage(info.img);
            }

            setIsLoading(false);
            navigation.goBack();
          }}
        >
          <ButtonText> Go back</ButtonText>
        </Button>

        <ImageContainer>
          {info.img.length > 0 ? (
            <ProfileImage source={{ uri: info.img }} />
          ) : (
            <ProfileImage
              source={require("../../assets/default-profile.png")}
            />
          )}
          <EditButton onPress={() => setModalVisible(!modalVisible)}>
            <EditButtonText>
              {isEditProfile
                ? "Change profile photo"
                : isEditGroup
                ? "Change group photo"
                : "Add group photo"}
            </EditButtonText>
          </EditButton>
        </ImageContainer>

        <FormInputLabel>
          {isEditProfile ? "Username" : "Group Name"}
        </FormInputLabel>
        <FormInput
          placeholder={isEditProfile ? "username" : "name"}
          value={isEditProfile ? info.username : info.name}
          onChangeText={(text) =>
            handleChangeText(text, isEditProfile ? "username" : "name")
          }
        />

        <FormInputLabel>
          {isEditProfile ? "Bio" : "Group Description"}
        </FormInputLabel>
        <FormInput
          placeholder={isEditProfile ? "bio" : "description"}
          value={isEditProfile ? info.bio : info.description}
          onChangeText={(text) =>
            handleChangeText(text, isEditProfile ? "bio" : "description")
          }
        />

        <EditButton onPress={handleSubmit}>
          <EditButtonText>
            {isEditProfile
              ? "Submit Change"
              : isEditGroup
              ? "Update Group Details"
              : "Create Group"}
          </EditButtonText>
        </EditButton>
      </Container>
    </Loading>
  );
};

export default EditSection;

const width = Dimensions.get("screen").width;

function isGroupNameValid(name) {
  return name.length > 0;
}

const ImageContainer = styled.View`
  align-items: center;
  justify-content: center;
`;

const ProfileImage = styled.Image`
  margin-top: 30px;
  align-self: center;
  height: 125px;
  width: 125px;
  border-radius: 75px;
  border-width: 1px;
  border-color: black;
`;

const EditButton = styled.TouchableOpacity`
  width: 90%;
  margin: 5px;
  margin-top: 10px;
  padding: 10px;
  align-self: center;
  border-radius: 10px;
  background-color: #000080;
`;

const EditButtonText = styled.Text`
  justify-content: center;
  align-self: center;
  font-size: 15px;
  font-weight: bold;
  color: #ffffff;
`;

const FormInput = styled.TextInput`
  flex-direction: row;
  width: 90%;
  margin: 5px;
  padding: 10px;
  border-radius: 10px;
  align-self: center;
  font-size: 15px;
  background-color: #f0f8ff;
`;

const FormInputLabel = styled.Text`
  font-family: ${Platform.OS === "ios" ? "Gill Sans" : "serif"};
  font-weight: bold;
  margin: 5px;
  margin-left: 20px;
  color: whitesmoke;
  font-size: 16px;
`;
