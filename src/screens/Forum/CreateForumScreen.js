import React, { useEffect, useState } from "react";
import {
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
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

import { firebase } from "../../firebase/Config";
import { useNavigation } from "@react-navigation/native";
const imageType = {
  PROFILE: 0,
  BANNER: 1
};

const initialForumInfo = {
  img: "",
  banner: "",
  title: "",
  desc: ""
};

const CreateForumScreen = () => {
  const [forumInfo, setForumInfo] = useState(initialForumInfo);
  const [modalVisible, setModalVisible] = useState(false);
  const [uploadedImgType, setUploadedImgType] = useState(imageType.PROFILE);
  const navigation = useNavigation();

  console.log(forumInfo);

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

  const pickImageFromCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Chattoku doesn't have access to your camera");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1
    });

    if (!result.cancelled) {
      uploadImage(result.uri);
      setModalVisible(false);
    }
  };

  const pickImageFromLibrary = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Chattoku doesn't have access to your image gallery");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1
    });

    if (!result.cancelled) {
      uploadImage(result.uri);
      setModalVisible(false);
    }
  };

  const removeImage = () => {
    const removedField =
      uploadedImgType === imageType.PROFILE ? "img" : "banner";
    setForumInfo({
      ...forumInfo,
      [removedField]: ""
    });
    setModalVisible(false);
  };

  const uploadImage = async (imgUrl) => {
    if (imgUrl == null || imgUrl.length == 0) {
      return;
    }

    const fileName = imgUrl.substring(imgUrl.lastIndexOf("/") + 1);
    const isProfileUploaded = uploadedImgType === imageType.PROFILE;
    const uploadedImage = isProfileUploaded ? "img" : "banner";
    const successMessage = isProfileUploaded
      ? "Profile Has Been Updated Successfully"
      : "Banner Has Been Uploaded Successfully";

    const uploadUri =
      Platform.OS === "ios" ? imgUrl.replace("file://", "") : imgUrl;

    const blob = await axios
      .get(uploadUri, { responseType: "blob" })
      .then((response) => response.data);

    const storageRef = firebase.storage().ref(fileName);
    await storageRef
      .put(blob, {
        contentType: "image/png"
      })
      .catch((error) => {
        Alert.alert(error.message);
      });

    await storageRef
      .getDownloadURL()
      .then((newImgUrl) => {
        handleChangeText(newImgUrl, uploadedImage);
      })
      .then(() => {
        Alert.alert(successMessage);
      })
      .catch((error) => {
        Alert.alert(error.message);
      });
  };

  const handleSubmit = async () => {
    const currentUID = firebase.auth().currentUser.uid;

    await firebase
      .firestore()
      .collection("forums")
      .add({
        ...forumInfo,
        owner: currentUID
      })
      .then(() => {
        navigation.navigate("ForumHome");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <View>
      <Modal
        animationType="fade"
        visible={modalVisible}
        presentationStyle="pageSheet"
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => pickImageFromCamera()}
          >
            <Text style={styles.buttonText}>Take Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => pickImageFromLibrary()}
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

      <Text> Enter Forum Details </Text>
      {forumInfo.img.length > 0 ? (
        <Image style={styles.img} source={{ uri: forumInfo.img }} />
      ) : (
        <Image
          style={styles.img}
          source={require("../../assets/default-profile.png")}
        />
      )}
      <TouchableOpacity onPress={handleUploadProfileClick}>
        <Text> Upload Image </Text>
      </TouchableOpacity>
      {forumInfo.banner.length > 0 ? (
        <Image style={styles.img} source={{ uri: forumInfo.banner }} />
      ) : (
        <Image
          style={styles.img}
          source={require("../../assets/default-profile.png")}
        />
      )}
      <TouchableOpacity onPress={handleUploadBannerClick}>
        <Text> Upload Banner </Text>
      </TouchableOpacity>
      <Text> Title </Text>
      <TextInput onChangeText={(text) => handleChangeText(text, "title")} />
      <Text> Description </Text>
      <TextInput onChangeText={(text) => handleChangeText(text, "desc")} />
      <TouchableOpacity onPress={handleSubmit}>
        <Text> Create Forum </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateForumScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "darkcyan",
    alignItems: "center",
    padding: 5,
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
