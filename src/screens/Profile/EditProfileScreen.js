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
  View,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

import { firebase } from "../../firebase/Config";
import { isUsernameTaken, isValidUsername } from "../../firebase/CheckUsername";

const EditProfileScreen = ({ navigation, route }) => {
  const [userInfo, setUserInfo] = useState(route.params.userInfo);
  const [modalVisible, setModalVisible] = useState(false);

  function handleChangeText(text, name) {
    setUserInfo({
      ...userInfo,
      [name]: text,
    });
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
      quality: 1,
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
      quality: 1,
    });

    if (!result.cancelled) {
      uploadImage(result.uri);
      setModalVisible(false);
    }
  };

  const uploadImage = async (imgUrl) => {
    if (imgUrl == null || imgUrl.length == 0) {
      return;
    }

    const fileName = imgUrl.substring(imgUrl.lastIndexOf("/") + 1);

    const uploadUri =
      Platform.OS === "ios" ? imgUrl.replace("file://", "") : imgUrl;

    const blob = await axios
      .get(uploadUri, { responseType: "blob" })
      .then((response) => response.data);

    const storageRef = firebase.storage().ref(fileName);
    await storageRef
      .put(blob, {
        contentType: "image/png",
      })
      .catch((error) => {
        Alert.alert(error.message);
      });

    await storageRef
      .getDownloadURL()
      .then((newImgUrl) => {
        handleChangeText(newImgUrl, "img");
      })
      .then(() => {
        Alert.alert("Profile picture has been updated");
      })
      .catch((error) => {
        Alert.alert(error.message);
      });
  };

  const handleSubmit = async () => {
    if (userInfo.username !== route.params.userInfo.username) {
      const isUsernameNotAvailable = await isUsernameTaken(userInfo.username);
      if (!isValidUsername(userInfo.username)) {
        Alert.alert(
          "username must only contains alphanumeric characters and must at least be 1 character long"
        );
        return;
      } else if (isUsernameNotAvailable) {
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
        username: userInfo.username,
        bio: userInfo.bio,
        img: userInfo.img,
      })
      .then(() => {
        navigation.navigate("ProfileHome");
      })
      .catch((error) => alert(error.message));
  };

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
        {userInfo.img.length > 0 ? (
          <Image style={styles.img} source={{ uri: userInfo.img }} />
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
          <Text style={styles.buttonText}>Change profile photo</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.textInputContainer}>
        <Text style={styles.textInputTitle}>Username</Text>
        <TextInput
          placeholder="username"
          value={userInfo.username}
          style={styles.textInput}
          onChangeText={(text) => handleChangeText(text, "username")}
        />
        <Text style={styles.textInputTitle}>Bio</Text>
        <TextInput
          placeholder="bio"
          value={userInfo.bio}
          style={styles.textInput}
          onChangeText={(text) => handleChangeText(text, "bio")}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={() => handleSubmit()}>
        <Text style={styles.buttonText}>Submit Change</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "darkcyan",
    alignItems: "center",
    padding: 5,
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    margin: 20,
  },
  modalButton: {
    alignSelf: "stretch",
    borderRadius: 10,
    padding: 15,
    backgroundColor: "cornflowerblue",
    marginTop: 10,
  },
  backButton: {
    alignSelf: "stretch",
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: "aquamarine",
    padding: 5,
    marginTop: 10,
  },
  backButtonText: {
    textAlign: "center",
    color: "blue",
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  img: {
    marginTop: 30,
    alignSelf: "center",
    height: 125,
    width: 125,
    borderRadius: 75,
  },
  button: {
    alignSelf: "stretch",
    borderRadius: 10,
    padding: 15,
    backgroundColor: "navy",
    marginTop: 10,
  },
  buttonText: {
    justifyContent: "center",
    alignSelf: "center",
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
  },
  textInputContainer: {
    marginTop: 30,
    alignItems: "stretch",
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: "navy",
    width: "100%",
    height: undefined,
    aspectRatio: 3 / 1,
  },
  textInputTitle: {
    fontFamily: Platform.OS === "ios" ? "Gill Sans" : "serif",
    fontWeight: "bold",
    textDecorationLine: "underline",
    margin: 5,
  },
  textInput: {
    flexDirection: "row",
    flex: 1,
    paddingLeft: 10,
    borderBottomWidth: 1,
    borderBottomColor: "navy",
    paddingBottom: 5,
  },
});
