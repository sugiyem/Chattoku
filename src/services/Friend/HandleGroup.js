import { Alert } from "react-native";
import { firebase } from "../Firebase/Config";

export async function createGroup(
  groupName,
  groupDescription,
  groupImg,
  app = firebase
) {
  const userID = app.auth().currentUser.uid;
  const db = app.firestore();
  const groupID = db.collection("groups").doc().id;
  const batch = db.batch();
  const userRef = db.collection("users").doc(userID);
  const groupRef = db.collection("groups").doc(groupID);

  batch.set(groupRef, {
    name: groupName,
    description: groupDescription,
    img: groupImg,
    lastMessageText: "",
    lastMessageAt: null
  });
  batch.set(groupRef.collection("members").doc(userID), {
    showMessage: false,
    showNotif: false
  });
  batch.set(userRef.collection("groupCreated").doc(groupID), {});
  batch.set(userRef.collection("groupJoined").doc(groupID), {});

  await batch
    .commit()
    .then(() => {
      Alert.alert("Group has successfully created");
    })
    .catch((error) => {
      Alert.alert("Error", error.message);
    });

  return groupID;
}

export async function editGroupDetails(
  groupID,
  newName,
  newDescription,
  newImg,
  app = firebase
) {
  await app
    .firestore()
    .collection("groups")
    .doc(groupID)
    .set({
      name: newName,
      description: newDescription,
      img: newImg
    })
    .then(() => {
      Alert.alert("Group has successfully edited");
    })
    .catch((error) => {
      Alert.alert("Error", error.message);
    });
}

export async function addUserToGroup(groupID, userID, app = firebase) {
  const db = app.firestore();
  const batch = db.batch();
  const userRef = db.collection("users").doc(userID);
  const groupRef = db.collection("groups").doc(groupID);

  batch.set(userRef.collection("groupInvited").doc(groupID), {});
  batch.set(groupRef.collection("pendingMembers").doc(userID), {});

  await batch
    .commit()
    .then(() => {
      Alert.alert("This user has been invited to the group.");
    })
    .catch((error) => {
      Alert.alert("Error", error.message);
    });
}

export async function removeUserFromGroup(groupID, userID, app = firebase) {
  const db = app.firestore();
  const batch = db.batch();
  const userRef = db.collection("users").doc(userID);
  const groupRef = db.collection("groups").doc(groupID);

  batch.delete(userRef.collection("groupJoined").doc(groupID));
  batch.delete(groupRef.collection("members").doc(userID));

  await batch
    .commit()
    .then(() => {
      Alert.alert("This user has been removed from the group.");
    })
    .catch((error) => {
      Alert.alert("Error", error.message);
    });
}

export async function cancelGroupInvitation(groupID, userID, app = firebase) {
  const db = app.firestore();
  const batch = db.batch();
  const userRef = db.collection("users").doc(userID);
  const groupRef = db.collection("groups").doc(groupID);

  batch.delete(userRef.collection("groupInvited").doc(groupID));
  batch.delete(groupRef.collection("pendingMembers").doc(userID));

  await batch
    .commit()
    .then(() => {
      Alert.alert("This invitation has been removed.");
    })
    .catch((error) => {
      Alert.alert("Error", error.message);
    });
}

export async function acceptGroupInvitation(groupID, app = firebase) {
  const userID = app.auth().currentUser.uid;
  const db = app.firestore();
  const batch = db.batch();
  const userRef = db.collection("users").doc(userID);
  const groupRef = db.collection("groups").doc(groupID);

  batch.delete(userRef.collection("groupInvited").doc(groupID));
  batch.delete(groupRef.collection("pendingMembers").doc(userID));
  batch.set(userRef.collection("groupJoined").doc(groupID), {});
  batch.set(groupRef.collection("members").doc(userID), {
    showMessage: false,
    showNotif: false
  });

  await batch
    .commit()
    .then(() => {
      Alert.alert("You have successfully joined this group");
    })
    .catch((error) => {
      Alert.alert("Error", error.message);
    });
}

export async function declineGroupInvitation(groupID, app = firebase) {
  const userID = app.auth().currentUser.uid;
  const db = app.firestore();
  const batch = db.batch();
  const userRef = db.collection("users").doc(userID);
  const groupRef = db.collection("groups").doc(groupID);

  batch.delete(userRef.collection("groupInvited").doc(groupID));
  batch.delete(groupRef.collection("pendingMembers").doc(userID));

  await batch
    .commit()
    .then(() => {
      Alert.alert("You have successfully declined this invitation");
    })
    .catch((error) => {
      Alert.alert("Error", error.message);
    });
}

export async function leaveGroup(groupID, app = firebase) {
  const userID = app.auth().currentUser.uid;
  const db = app.firestore();
  const batch = db.batch();
  const userRef = db.collection("users").doc(userID);
  const groupRef = db.collection("groups").doc(groupID);

  batch.delete(userRef.collection("groupJoined").doc(groupID));
  batch.delete(groupRef.collection("members").doc(userID));

  await batch
    .commit()
    .then(() => {
      Alert.alert("You have successfully left this group.");
    })
    .catch((error) => {
      Alert.alert("Error", error.message);
    });
}

export async function deleteGroup(groupID, app = firebase) {
  const db = app.firestore();
  const batch = db.batch();
  const groupRef = db.collection("groups").doc(groupID);
  const messagesSnapshot = await groupRef.collection("messages").get();
  const membersSnapshot = await groupRef.collection("members").get();
  const pendingMembersSnapshot = await groupRef
    .collection("pendingMembers")
    .get();

  messagesSnapshot.docs.forEach((doc) => {
    batch.delete(doc.ref);
  });

  membersSnapshot.docs.forEach((doc) => {
    batch.delete(doc.ref);
  });

  pendingMembersSnapshot.docs.forEach((doc) => {
    batch.delete(doc.ref);
  });

  batch.delete(groupRef);

  await batch
    .commit()
    .then(() => {
      Alert.alert("Group successfully deleted");
    })
    .catch((error) => {
      Alert.alert("Error", error.message);
    });
}
