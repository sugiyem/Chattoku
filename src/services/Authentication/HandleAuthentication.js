import { Alert } from "react-native";
import { firebase } from "../Firebase/Config";
import { registerForPushNotificationsAsync } from "../Miscellaneous/HandleNotification";

export function redirectToForgotPasswordScreen(navigation) {
  navigation.replace("ForgotPassword");
}

export function redirectToLoginScreen(navigation) {
  navigation.replace("Login");
}

export function redirectToSignupScreen(navigation) {
  navigation.replace("Signup");
}

export function isPasswordTooShort(password) {
  return password.length < 6;
}

// A str is considered a valid email if it is in the form of
// anystring@anystring.anystring
export function isValidEmail(str) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(str);
}

export async function login(credentials, navigation, app = firebase) {
  await app
    .auth()
    .signInWithEmailAndPassword(credentials.email, credentials.password)
    .catch((e) => {
      console.log("Incorrect Credentials");
      Alert.alert("Incorrect Email / Password");
    });

  const currentUser = firebase.auth().currentUser;

  // console.log(currentUser);

  if (currentUser === null) {
    return;
    // console.log("Incorrect Credentials");
    // Alert.alert("Incorrect Email / Password");
    // await firebase.auth().signOut();
  } else if (!currentUser.emailVerified) {
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
    await app.auth().signOut();
  } else {
    const token = await registerForPushNotificationsAsync();

    if (token) {
      await app
        .firestore()
        .collection("users")
        .doc(currentUser.uid)
        .set({ notificationToken: token }, { merge: true });
    }

    navigation.replace("Dashboard");
  }
}

export function signOut(app = firebase) {
  app.auth().signOut();
}

export function signUp(credentials, navigation, app = firebase) {
  app
    .auth()
    .createUserWithEmailAndPassword(credentials.email, credentials.password)
    .then(async (response) => {
      response.user.sendEmailVerification();

      const currentUID = app.auth().currentUser.uid;

      await firebase.firestore().collection("users").doc(currentUID).set({
        app: credentials.username,
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

      signOut();

      // console.log("finished");
    })
    .then(() => {
      redirectToLoginScreen(navigation);
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
