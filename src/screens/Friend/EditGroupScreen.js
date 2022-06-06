import React, { useState } from "react";
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
import { editGroupDetails } from "../../firebase/HandleGroup";

const EditGroupScreen = ({ navigation, route }) => {
  const [groupInfo, setGroupInfo] = useState(route.params.groupInfo);
  const [modalVisible, setModalVisible] = useState(false);

  function handleChangeText(text, name) {
    setGroupInfo({
      ...groupInfo,
      [name]: text
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
    setGroupInfo({
      ...groupInfo,
      img: ""
    });
    setModalVisible(false);
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
        contentType: "image/png"
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
        Alert.alert("Group picture has been updated");
      })
      .catch((error) => {
        Alert.alert(error.message);
      });
  };

  const handleSubmit = () => {
    if (!isGroupNameValid(groupInfo.name)) {
      Alert.alert("Invalid name");
    } else {
      editGroupDetails(
        groupInfo.id,
        groupInfo.name,
        groupInfo.description,
        groupInfo.img,
        navigation
      );
    }
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
        {groupInfo.img.length > 0 ? (
          <Image style={styles.img} source={{ uri: groupInfo.img }} />
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
          <Text style={styles.buttonText}>Edit Group Photo</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.textInputContainer}>
        <Text style={styles.textInputTitle}>Group Name</Text>
        <TextInput
          placeholder="name"
          value={groupInfo.name}
          style={styles.textInput}
          onChangeText={(text) => handleChangeText(text, "name")}
        />
        <Text style={styles.textInputTitle}>Group Description</Text>
        <TextInput
          placeholder="description"
          value={groupInfo.description}
          style={styles.textInput}
          onChangeText={(text) => handleChangeText(text, "description")}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={() => handleSubmit()}>
        <Text style={styles.buttonText}>Submit Change</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditGroupScreen;

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
