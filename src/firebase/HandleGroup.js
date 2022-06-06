import { Alert } from "react-native";
import { firebase } from "./Config";

export async function createGroup(groupName, groupDescription, groupImg) {
  const userID = firebase.auth().currentUser.uid;
  const userRef = firebase.firestore().collection("users").doc(userID);
  let groupID = "";

  await firebase
    .firestore()
    .collection("groups")
    .add({
      name: groupName,
      description: groupDescription,
      img: groupImg,
      lastMessageText: "",
      lastMessageAt: null
    })
    .then((docRef) => {
      groupID = docRef.id;
    })
    .then(async () => {
      await userRef.collection("groupCreated").doc(groupID).set({});
    })
    .then(async () => {
      await userRef.collection("groupJoined").doc(groupID).set({});
    })
    .then(async () => {
      await firebase
        .firestore()
        .collection("groups")
        .doc(groupID)
        .collection("members")
        .doc(userID)
        .set({});
    })
    .then(() => {
      Alert.alert("Group successfully created.");
    })
    .catch((error) => {
      Alert.alert("Error", error.message);
    });
}

export async function editGroupDetails(
  groupID,
  newName,
  newDescription,
  newImg
) {
  await firebase
    .firestore()
    .collection("groups")
    .doc(groupID)
    .set({
      name: newName,
      description: newDescription,
      img: newImg
    })
    .then(() => {
      Alert.alert("Group details has successfully edited.");
    })
    .catch((error) => {
      Alert.alert("Error", error.message);
    });
}

export async function addUserToGroup(groupID, userID) {
  await firebase
    .firestore()
    .collection("users")
    .doc(userID)
    .collection("groupInvited")
    .doc(groupID)
    .set({})
    .then(async () => {
      await firebase
        .firestore()
        .collection("groups")
        .doc(groupID)
        .collection("pendingMembers")
        .doc(userID)
        .set({});
    })
    .then(() => {
      Alert.alert("This new user has been invited to the group.");
    })
    .catch((error) => {
      Alert.alert("Error", error.message);
    });
}

export async function removeUserFromGroup(groupID, userID) {
  await firebase
    .firestore()
    .collection("users")
    .doc(userID)
    .collection("groupJoined")
    .doc(groupID)
    .delete()
    .then(async () => {
      await firebase
        .firestore()
        .collection("groups")
        .doc(groupID)
        .collection("members")
        .doc(userID)
        .delete();
    })
    .then(() => {
      Alert.alert("This user has been removed from the group.");
    })
    .catch((error) => {
      Alert.alert("Error", error.message);
    });
}

export async function cancelGroupInvitation(groupID, userID) {
  await firebase
    .firestore()
    .collection("users")
    .doc(userID)
    .collection("groupInvited")
    .doc(groupID)
    .delete()
    .then(async () => {
      await firebase
        .firestore()
        .collection("groups")
        .doc(groupID)
        .collection("pendingMembers")
        .doc(userID)
        .delete();
    })
    .then(() => {
      Alert.alert("This invitation has been removed.");
    })
    .catch((error) => {
      Alert.alert("Error", error.message);
    });
}

export async function acceptGroupInvitation(groupID) {
  const userID = firebase.auth().currentUser.uid;
  const userRef = firebase.firestore().collection("users").doc(userID);
  const groupRef = firebase.firestore().collection("groups").doc(groupID);

  await userRef
    .collection("groupInvited")
    .doc(groupID)
    .delete()
    .then(async () => {
      await userRef.collection("groupJoined").doc(groupID).set({});
    })
    .then(async () => {
      await groupRef.collection("pendingMembers").doc(userID).delete();
    })
    .then(async () => {
      await groupRef.collection("members").doc(userID).set({
        showMessage: false,
        showNotif: false
      });
    })
    .then(() => {
      Alert.alert("You have successfully joined this group");
    })
    .catch((error) => {
      Alert.alert("Error", error.message);
    });
}

export async function declineGroupInvitation(groupID) {
  const userID = firebase.auth().currentUser.uid;

  await firebase
    .firestore()
    .collection("users")
    .doc(userID)
    .collection("groupInvited")
    .doc(groupID)
    .delete()
    .then(async () => {
      await firebase
        .firestore()
        .collection("groups")
        .doc(groupID)
        .collection("pendingMembers")
        .doc(userID)
        .delete({});
    })
    .then(() => {
      Alert.alert("You have successfully declined this invitation");
    })
    .catch((error) => {
      Alert.alert("Error", error.message);
    });
}

export async function leaveGroup(groupID) {
  const userID = firebase.auth().currentUser.uid;
  const userRef = firebase.firestore().collection("users").doc(userID);

  await userRef
    .collection("groupCreated")
    .doc(groupID)
    .delete()
    .then(async () => {
      await userRef.collection("groupJoined").doc(groupID).delete();
    })
    .then(async () => {
      await firebase
        .firestore()
        .collection("groups")
        .doc(groupID)
        .collection("members")
        .doc(userID)
        .delete();
    })
    .then(() => {
      Alert.alert("You have successfully left this group.");
    })
    .catch((error) => {
      Alert.alert("Error", error.message);
    });
}

export async function deleteGroup(groupID) {
  await firebase
    .firestore()
    .collection("groups")
    .doc(groupID)
    .delete()
    .then(() => {
      Alert.alert("This group has successfully deleted");
    })
    .catch((error) => {
      Alert.alert("Error", error.message);
    });
}
