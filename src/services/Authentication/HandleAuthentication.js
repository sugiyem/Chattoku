import { Alert } from "react-native";
import { firebase } from "../Firebase/Config";
import { registerForPushNotificationsAsync } from "../Miscellaneous/HandleNotification";
import { MAXIMUM_BATCH_SIZE } from "../../constants/Batch";

export function handleIsLoggedIn(onIsLoggedIn, app = firebase) {
  const currentUser = app.auth().currentUser;

  if (!currentUser) return;

  onIsLoggedIn();
}

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

export async function deleteAccount(onSuccess, onFailure, app = firebase) {
  const userID = app.auth().currentUser.uid;
  const db = app.firestore();
  let batch = db.batch();
  const firebaseRefToBeDeleted = [];
  const userRef = db.collection("users").doc(userID);
  const animeSnapshot = await userRef.collection("anime").get();
  const dislikeSnapshot = await userRef.collection("dislikes").get();
  const likeSnapshot = await userRef.collection("likes").get();
  const followSnapshot = await userRef.collection("follows").get();
  const postSnapshot = await userRef.collection("posts").get();
  const friendSnapshot = await userRef.collection("friends").get();
  const receivedRequestSnapshot = await userRef
    .collection("friendRequestsReceived")
    .get();
  const sentRequestSnapshot = await userRef
    .collection("friendRequestsSent")
    .get();
  const blockedSnapshot = await userRef.collection("blockedUsers").get();
  const groupSnapshot = await userRef.collection("groupJoined").get();
  const groupCreatedSnapshot = await userRef.collection("groupCreated").get();
  const groupInvitationSnapshot = await userRef
    .collection("groupInvited")
    .get();

  animeSnapshot.docs.forEach((doc) => firebaseRefToBeDeleted.push(doc.ref));
  dislikeSnapshot.docs.forEach((doc) => firebaseRefToBeDeleted.push(doc.ref));
  likeSnapshot.docs.forEach((doc) => firebaseRefToBeDeleted.push(doc.ref));
  followSnapshot.docs.forEach((doc) => firebaseRefToBeDeleted.push(doc.ref));
  postSnapshot.docs.forEach((doc) => firebaseRefToBeDeleted.push(doc.ref));
  friendSnapshot.docs.forEach((doc) => firebaseRefToBeDeleted.push(doc.ref));
  receivedRequestSnapshot.docs.forEach((doc) =>
    firebaseRefToBeDeleted.push(doc.ref)
  );
  sentRequestSnapshot.docs.forEach((doc) =>
    firebaseRefToBeDeleted.push(doc.ref)
  );
  blockedSnapshot.docs.forEach((doc) => firebaseRefToBeDeleted.push(doc.ref));
  groupSnapshot.docs.forEach((doc) => firebaseRefToBeDeleted.push(doc.ref));
  groupCreatedSnapshot.docs.forEach((doc) =>
    firebaseRefToBeDeleted.push(doc.ref)
  );
  groupInvitationSnapshot.docs.forEach((doc) =>
    firebaseRefToBeDeleted.push(doc.ref)
  );

  firebaseRefToBeDeleted.push(userRef);

  let count = 0;
  // Number of batch operation needed might be larger than
  // the limit given by firebase. Need to split it into
  // different commits
  for (let i = 0; i < firebaseRefToBeDeleted.length; i++) {
    batch.delete(firebaseRefToBeDeleted[i]);
    count++;
    if (count == MAXIMUM_BATCH_SIZE) {
      await batch.commit().catch(onFailure);
      // reinitialize batch & count
      batch = db.batch();
      count = 0;
    }
  }
  // Last batch commit
  await batch.commit().catch(onFailure);

  await app
    .auth()
    .currentUser.delete()
    .then(() => onSuccess())
    .catch(onFailure);
}
