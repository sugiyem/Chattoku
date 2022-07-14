import { Alert } from "react-native";
import { firebase } from "../Firebase/Config";
import {
  sendPushNotification,
  sendNotificationToAllGroupMembers
} from "../Miscellaneous/HandleNotification";
import { sendSystemMessageToGroup } from "../Chat/HandleSystemMessage";
import { MAXIMUM_BATCH_SIZE } from "../../constants/Batch";

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
    owner: userID,
    name: groupName,
    description: groupDescription,
    img: groupImg,
    lastMessageText: "",
    lastMessageAt: null,
    lastAccessedAt: null
  });
  batch.set(groupRef.collection("members").doc(userID), {
    showMessage: false,
    showNotif: false
  });
  batch.set(groupRef.collection("admins").doc(userID), {});
  // batch.set(userRef.collection("groupCreated").doc(groupID), {});
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
    .set(
      {
        name: newName,
        description: newDescription,
        img: newImg
      },
      { merge: true }
    )
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

  const { username, notificationToken } = await db
    .collection("users")
    .doc(userID)
    .get()
    .then((doc) => doc.data());

  const groupName = await db
    .collection("groups")
    .doc(groupID)
    .get()
    .then((doc) => doc.data().name);

  batch.set(userRef.collection("groupInvited").doc(groupID), {});
  batch.set(groupRef.collection("pendingMembers").doc(userID), {});

  await batch
    .commit()
    .then(() => {
      Alert.alert("This user has been invited to the group.");
    })
    .then(() => {
      sendPushNotification(
        notificationToken,
        "Chattoku's New group Invitation",
        `Hi ${username}, you have been invited to ${groupName}.`
      );
    })
    .then(() => {
      sendSystemMessageToGroup(
        `${username} has been invited by the group's admin.`,
        groupID
      );
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

  // If user is an admin, demote first
  batch.delete(groupRef.collection("admins").doc(userID));

  const { username, notificationToken } = await db
    .collection("users")
    .doc(userID)
    .get()
    .then((doc) => doc.data());

  const groupName = await db
    .collection("groups")
    .doc(groupID)
    .get()
    .then((doc) => doc.data().name);

  await batch
    .commit()
    .then(() => {
      Alert.alert("This user has been removed from the group.");
    })
    .then(() => {
      sendSystemMessageToGroup(
        `${username} has been kicked by the group's admin.`,
        groupID
      );
    })
    .then(() => {
      sendPushNotification(
        notificationToken,
        "Chattoku's Removal From Group",
        `Hi ${username}, you have been kicked from ${groupName} by the group admin.`
      );
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

  const username = await db
    .collection("users")
    .doc(userID)
    .get()
    .then((doc) => doc.data().username);

  const groupName = await db
    .collection("groups")
    .doc(groupID)
    .get()
    .then((doc) => doc.data().name);

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
    .then(() => {
      console.log("system message otw");
      sendSystemMessageToGroup(
        `${username} has just joined the group.`,
        groupID
      );
    })
    .then(() => {
      sendNotificationToAllGroupMembers(
        groupID,
        userID,
        "Chattoku's New Group Member",
        `Please welcome ${username}, the new member of ${groupName}.`,
        db
      );
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

  const username = await userRef.get().then((doc) => doc.data().username);

  batch.delete(userRef.collection("groupJoined").doc(groupID));
  batch.delete(groupRef.collection("members").doc(userID));

  // If user is admin, demote first
  batch.delete(groupRef.collection("admins").doc(userID));

  await batch
    .commit()
    .then(() => {
      Alert.alert("You have successfully left this group.");
    })
    .then(() => {
      sendSystemMessageToGroup(`${username} has just left the group.`, groupID);
    })
    .catch((error) => {
      Alert.alert("Error", error.message);
    });
}

export async function deleteGroup(groupID, app = firebase) {
  const db = app.firestore();
  const batch = db.batch();
  const groupRef = db.collection("groups").doc(groupID);
  const firebaseRefToBeDeleted = [];
  const messagesSnapshot = await groupRef.collection("messages").get();
  const adminsSnapshot = await groupRef.collection("admins").get();
  const membersSnapshot = await groupRef.collection("members").get();
  const pendingMembersSnapshot = await groupRef
    .collection("pendingMembers")
    .get();

  const groupName = await db
    .collection("groups")
    .doc(groupID)
    .get()
    .then((doc) => doc.data().name);

  messagesSnapshot.docs.forEach((doc) => firebaseRefToBeDeleted.push(doc.ref));
  adminsSnapshot.docs.forEach((doc) => firebaseRefToBeDeleted.push(doc.ref));
  membersSnapshot.docs.forEach((doc) => firebaseRefToBeDeleted.push(doc.ref));
  pendingMembersSnapshot.docs.forEach((doc) =>
    firebaseRefToBeDeleted.push(doc.ref)
  );

  firebaseRefToBeDeleted.push(groupRef);

  await sendNotificationToAllGroupMembers(
    groupID,
    null,
    "Chattoku's Group Deletion",
    `${groupName} is going to be deleted.`,
    db
  );

  let count = 0;
  // Number of batch operation needed might be larger than
  // the limit given by firebase. Need to split it into
  // different commits
  for (let i = 0; i < firebaseRefToBeDeleted.length; i++) {
    batch.delete(firebaseRefToBeDeleted[i]);
    count++;
    if (count == MAXIMUM_BATCH_SIZE) {
      await batch
        .commit()
        .catch((error) => Alert.alert("Error", error.message));
      // reinitialize batch & count
      batch = db.batch();
      count = 0;
    }
  }
  // Last batch commit
  await batch
    .commit()
    .then(() => Alert.alert("Group successfully deleted"))
    .catch((error) => Alert.alert("Error", error.message));
}
