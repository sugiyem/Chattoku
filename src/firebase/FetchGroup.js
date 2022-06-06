import { firebase } from "./Config";

export function fetchGroup({ onSuccess, onFailure }) {
  const userID = firebase.auth().currentUser.uid;

  return firebase
    .firestore()
    .collection("users")
    .doc(userID)
    .collection("groupJoined")
    .onSnapshot(
      async (querySnapshot) => {
        const groupIDLists = [];
        const groupInfoLists = [];

        querySnapshot.forEach((documentSnapshot) => {
          groupIDLists.push(documentSnapshot.id);
        });

        await firebase
          .firestore()
          .collection("groups")
          .get()
          .then((snaps) => {
            snaps.forEach((snap) => {
              if (groupIDLists.includes(snap.id)) {
                groupInfoLists.push({
                  id: snap.id,
                  name: snap.data().name,
                  description: snap.data().description,
                  img: snap.data().img
                });
              }
            });
          });

        onSuccess(groupInfoLists);
      },
      (error) => {
        onFailure(error);
      }
    );
}

export function fetchGroupInvitation({ onSuccess, onFailure }) {
  const userID = firebase.auth().currentUser.uid;

  return firebase
    .firestore()
    .collection("users")
    .doc(userID)
    .collection("groupInvited")
    .onSnapshot(
      async (querySnapshot) => {
        const groupIDLists = [];
        const groupInfoLists = [];

        querySnapshot.forEach((documentSnapshot) => {
          groupIDLists.push(documentSnapshot.id);
        });

        console.log(groupIDLists);

        await firebase
          .firestore()
          .collection("groups")
          .get()
          .then((snaps) => {
            snaps.forEach((snap) => {
              if (groupIDLists.includes(snap.id)) {
                groupInfoLists.push({
                  id: snap.id,
                  name: snap.data().name,
                  description: snap.data().description,
                  img: snap.data().img
                });
              }
            });
          });

        onSuccess(groupInfoLists);
      },
      (error) => {
        onFailure(error);
      }
    );
}

export function checkGroupInvitation({ onFound, onNotFound, onFailure }) {
  const userID = firebase.auth().currentUser.uid;

  return firebase
    .firestore()
    .collection("users")
    .doc(userID)
    .collection("groupInvited")
    .onSnapshot(
      (querySnapshot) => {
        if (querySnapshot.size !== 0) {
          onFound();
        } else {
          onNotFound();
        }
      },
      (error) => {
        onFailure(error);
      }
    );
}

export function fetchGroupInfo({ groupID, onSuccess, onFailure }) {
  return firebase
    .firestore()
    .collection("groups")
    .doc(groupID)
    .onSnapshot(
      (documentSnapshot) => {
        const groupInfo = {
          id: documentSnapshot.id,
          name: documentSnapshot.data().name,
          description: documentSnapshot.data().description,
          img: documentSnapshot.data().img
        };

        onSuccess(groupInfo);
      },
      (error) => {
        onFailure(error);
      }
    );
}

export function fetchGroupMembers({ groupID, onSuccess, onFailure }) {
  return firebase
    .firestore()
    .collection("groups")
    .doc(groupID)
    .collection("members")
    .onSnapshot(
      async (querySnapshot) => {
        const memberID = [];
        const memberInfo = [];

        querySnapshot.forEach((documentSnapshot) => {
          memberID.push(documentSnapshot.id);
        });

        await firebase
          .firestore()
          .collection("users")
          .get()
          .then((snaps) => {
            snaps.forEach((snap) => {
              if (memberID.includes(snap.id)) {
                memberInfo.push({
                  id: snap.id,
                  username: snap.data().username,
                  bio: snap.data().bio,
                  img: snap.data().img
                });
              }
            });
          });

        onSuccess(memberInfo);
      },
      (error) => {
        onFailure(error);
      }
    );
}

export function fetchPendingGroupMembers({ groupID, onSuccess, onFailure }) {
  return firebase
    .firestore()
    .collection("groups")
    .doc(groupID)
    .collection("pendingMembers")
    .onSnapshot(
      async (querySnapshot) => {
        const pendingMemberID = [];
        const pendingMemberInfo = [];

        querySnapshot.forEach((documentSnapshot) => {
          pendingMemberID.push(documentSnapshot.id);
        });

        await firebase
          .firestore()
          .collection("users")
          .get()
          .then((snaps) => {
            snaps.forEach((snap) => {
              if (pendingMemberID.includes(snap.id)) {
                pendingMemberInfo.push({
                  id: snap.id,
                  username: snap.data().username,
                  img: snap.data().img
                });
              }
            });
          });

        onSuccess(pendingMemberInfo);
      },
      (error) => {
        onFailure(error);
      }
    );
}
