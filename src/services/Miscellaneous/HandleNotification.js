import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import axios from "axios";
import { NOTIFICATION_URL } from "../../constants/Miscellaneous";
import { firebase } from "../Firebase/Config";

export async function registerForPushNotificationsAsync() {
  let token;

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C"
    });
  }

  return token;
}

export async function sendPushNotification(expoPushToken, title, body) {
  if (!expoPushToken) {
    return;
  }

  const message = {
    to: expoPushToken,
    sound: "default",
    title: title,
    body: body,
    data: { someData: "goes here" }
  };

  const headerPost = {
    Accept: "application/json",
    "Accept-encoding": "gzip, deflate",
    "Content-Type": "application/json"
  };

  await axios.post(NOTIFICATION_URL, JSON.stringify(message), {
    headers: headerPost
  });
}

export async function sendNotificationToAllGroupMembers(
  groupID,
  exceptionID = null,
  title,
  body,
  app = firebase
) {
  const groupMembers = [];

  const userLists = await app.firestore().collection("users").get();

  await app
    .firestore()
    .collection("groups")
    .doc(groupID)
    .collection("members")
    .get()
    .then((query) => {
      query.forEach((doc) => {
        groupMembers.push(doc.id);
      });
    });

  console.log(groupMembers);

  userLists.docs.map((doc) => {
    if (doc.id !== exceptionID && groupMembers.includes(doc.id)) {
      sendPushNotification(doc.data().notificationToken, title, body);
    }
  });
}
