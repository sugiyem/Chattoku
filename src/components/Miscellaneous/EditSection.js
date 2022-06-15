import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

import { firebase } from "../../firebase/Config";
import { isUsernameTaken, isValidUsername } from "../../firebase/CheckUsername";
import { createGroup, editGroupDetails } from "../../firebase/HandleGroup";
import { writeSectionType } from "../../constants/Miscellaneous";
import {
  pickImageFromCamera,
  pickImageFromLibrary,
  uploadImage
} from "./HandleImage";

const EditSection = ({ type, currentState, navigation }) => {
  const [info, setInfo] = useState(currentState);
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const initialUsername = currentState.username;

  const isEditProfile = type === writeSectionType.EDIT_PROFILE;
  const isEditGroup = type === writeSectionType.EDIT_GROUP;

  function handleChangeText(text, name) {
    setInfo({
      ...info,
      [name]: text
    });
  }

  const handleUpload = async (imgUrl) => {
    setModalVisible(false);
    await uploadImage(
      imgUrl,
      () => setIsLoading(true),
      () => setIsLoading(false),
      (newImg) => handleChangeText(newImg, "img")
    );
  };

  const removeImage = () => {
    setInfo({
      ...info,
      img: ""
    });
    setModalVisible(false);
  };

  const handleSubmit = async () => {
    if (isEditProfile) {
      setIsLoading(true);
      if (info.username !== initialUsername) {
        const isUsernameNotAvailable = await isUsernameTaken(initialUsername);
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

      const userID = firebase.auth().currentUser.uid;

      await firebase
        .firestore()
        .collection("users")
        .doc(userID)
        .update({
          username: info.username,
          bio: info.bio,
          img: info.img
        })
        .then(() => {
          setIsLoading(false);
          navigation.navigate("ProfileHome");
        })
        .catch((error) => {
          setIsLoading(false);
          Alert.alert("Error", error.message);
        });
    } else {
      if (!isGroupNameValid(info.name)) {
        Alert.alert("Invalid group name");
        return;
      }

      if (isEditGroup) {
        setIsLoading(true);
        await editGroupDetails(
          info.id,
          info.name,
          info.description,
          info.img
        ).finally(() => {
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
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Modal
        animationType="fade"
        visible={modalVisible}
        presentationStyle="pageSheet"
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => pickImageFromCamera(handleUpload)}
          >
            <Text style={styles.buttonText}>Take Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => pickImageFromLibrary(handleUpload)}
          >
            <Text style={styles.buttonText}>Choose From Library</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => removeImage()}
          >
            <Text style={styles.buttonText}>Remove Image</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}> Go back</Text>
      </TouchableOpacity>

      <View style={styles.imageContainer}>
        {info.img.length > 0 ? (
          <Image style={styles.img} source={{ uri: info.img }} />
        ) : (
          <Image
            style={styles.img}
            source={require("../../assets/default-profile.png")}
          />
        )}
        <TouchableOpacity
          style={styles.button}
          onPress={() => setModalVisible(!modalVisible)}
        >
          <Text style={styles.buttonText}>
            {isEditProfile
              ? "Change profile photo"
              : isEditGroup
              ? "Change group photo"
              : "Add group photo"}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.textInputContainer}>
        <Text style={styles.textInputTitle}>
          {isEditProfile ? "Username" : "Group Name"}
        </Text>
        <TextInput
          placeholder={isEditProfile ? "username" : "name"}
          value={isEditProfile ? info.username : info.name}
          style={styles.textInput}
          onChangeText={(text) =>
            handleChangeText(text, isEditProfile ? "username" : "name")
          }
        />
        <Text style={styles.textInputTitle}>
          {isEditProfile ? "Bio" : "Group Description"}
        </Text>
        <TextInput
          placeholder={isEditProfile ? "bio" : "description"}
          value={isEditProfile ? info.bio : info.description}
          style={styles.textInput}
          onChangeText={(text) =>
            handleChangeText(text, isEditProfile ? "bio" : "description")
          }
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={() => handleSubmit()}>
        <Text style={styles.buttonText}>
          {isEditProfile
            ? "Submit Change"
            : isEditGroup
            ? "Update Group Details"
            : "Create Group"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditSection;

function isGroupNameValid(name) {
  return name.length > 0;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "darkcyan",
    alignItems: "center",
    padding: 5,
    flex: 1
  },
  loadingContainer: {
    backgroundColor: "darkcyan",
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    margin: 20
  },
  modalButton: {
    alignSelf: "stretch",
    borderRadius: 10,
    padding: 15,
    backgroundColor: "cornflowerblue",
    marginTop: 10
  },
  backButton: {
    alignSelf: "stretch",
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: "aquamarine",
    padding: 5,
    marginTop: 10
  },
  backButtonText: {
    textAlign: "center",
    color: "blue"
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center"
  },
  img: {
    marginTop: 30,
    alignSelf: "center",
    height: 125,
    width: 125,
    borderRadius: 75
  },
  button: {
    alignSelf: "stretch",
    borderRadius: 10,
    padding: 15,
    backgroundColor: "navy",
    marginTop: 10
  },
  buttonText: {
    justifyContent: "center",
    alignSelf: "center",
    fontSize: 15,
    fontWeight: "bold",
    color: "white"
  },
  textInputContainer: {
    marginTop: 30,
    alignItems: "stretch",
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: "navy",
    width: "100%",
    height: undefined,
    aspectRatio: 3 / 1
  },
  textInputTitle: {
    fontFamily: Platform.OS === "ios" ? "Gill Sans" : "serif",
    fontWeight: "bold",
    textDecorationLine: "underline",
    margin: 5
  },
  textInput: {
    flexDirection: "row",
    flex: 1,
    paddingLeft: 10,
    borderBottomWidth: 1,
    borderBottomColor: "navy",
    paddingBottom: 5
  }
});
