import { Alert, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { firebase } from "../../firebase/Config";

export async function pickImageFromCamera(upload) {
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
    upload(result.uri);
  }
}

export async function pickImageFromLibrary(upload) {
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
    upload(result.uri);
  }
}

export async function uploadImage(
  imgUrl,
  beforeUpload,
  afterUpload,
  updateImg
) {
  if (imgUrl == null || imgUrl.length == 0) {
    return;
  }

  beforeUpload();

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
      updateImg(newImgUrl);
    })
    .then(() => {
      afterUpload();
      Alert.alert("Profile picture has been updated");
    })
    .catch((error) => {
      afterUpload();
      Alert.alert(error.message);
    });
}