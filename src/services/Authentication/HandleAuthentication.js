import { Alert } from "react-native";
import { firebase } from "../Firebase/Config";
import { registerForPushNotificationsAsync } from "../Miscellaneous/HandleNotification";

export async function login(
  credentials,
  onSuccess,
  deviceToken = null,
  isVerified = false,
  app = firebase
) {
  await app
    .auth()
    .signInWithEmailAndPassword(credentials.email, credentials.password)
    .catch((e) => {
      console.log("Incorrect Credentials");
      Alert.alert("Incorrect Email / Password");
    });

  const currentUser = app.auth().currentUser;

  console.log(currentUser);

  if (currentUser === null) {
    return;
    // console.log("Incorrect Credentials");
    // Alert.alert("Incorrect Email / Password");
    // await firebase.auth().signOut();
  } else if (!isVerified && !currentUser.emailVerified) {
    console.log("email not verified");
    Alert.alert("Please Verify Your Email Before Logging In", "", [
      {
        text: "Resend verification email",
        onPress: () => currentUser.sendEmailVerification()
      },
      {
        text: "Cancel"
      }
    ]);

    signOut(app);
  } else {
    let token = null;

    if (deviceToken) {
      token = deviceToken;
    } else {
      token = await registerForPushNotificationsAsync();
    }

    if (token) {
      await app
        .firestore()
        .collection("users")
        .doc(currentUser.uid)
        .set({ notificationToken: token }, { merge: true });
    }

    onSuccess();
  }
}

export function signOut(app = firebase) {
  app.auth().signOut();
}

export async function signUp(credentials, onSuccess, app = firebase) {
  app
    .auth()
    .createUserWithEmailAndPassword(credentials.email, credentials.password)
    .then(async (response) => {
      response.user.sendEmailVerification();

      const currentUID = app.auth().currentUser.uid;

      await app.firestore().collection("users").doc(currentUID).set({
        username: credentials.username,
        bio: "",
        img: "",
        genres: [],
        friends: [],
        id: currentUID
      });

      Alert.alert(
        "Email sent.",
        "Please verify your account before signing in."
      );

      signOut(app);

      // console.log("finished");
    })
    .then(() => {
      onSuccess();
    })
    .catch((e) => {
      console.log(e);
      Alert.alert("email is already taken");
      console.log("email already taken");
    });
}

export async function sendForgotPasswordEmail(email, app = firebase) {
  await app
    .auth()
    .sendPasswordResetEmail(email)
    .then(() => {
      Alert.alert(
        "Email successfully sent",
        "An email to reset your password has been sent." +
          " Do check your spam folder"
      );
    })
    .catch((error) => {
      Alert.alert("Email is not registered");
    });
}
