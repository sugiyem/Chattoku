import { firebase } from "./Config";

export const fetchFriend = ({ onSuccess, onFailure }) => {
  const userID = firebase.auth().currentUser.uid;

  return firebase
    .firestore()
    .collection("users")
    .doc(userID)
    .collection("friends")
    .onSnapshot(
      async (querySnapshot) => {
        const friendIDLists = [];
        const friendInfoLists = [];

        querySnapshot.forEach((documentSnapshot) => {
          friendIDLists.push(documentSnapshot.id);
        });

        await firebase
          .firestore()
          .collection("users")
          .get()
          .then((snaps) => {
            snaps.forEach((snap) => {
              if (friendIDLists.includes(snap.id)) {
                friendInfoLists.push(snap.data());
              }
            });
          });

        onSuccess(friendInfoLists);
      },
      (error) => {
        onFailure(error);
      }
    );
};

export const fetchFriendRequestsSent = ({ onSuccess, onFailure }) => {
  const userID = firebase.auth().currentUser.uid;

  return firebase
    .firestore()
    .collection("users")
    .doc(userID)
    .collection("friendRequestsSent")
    .onSnapshot(
      async (querySnapshot) => {
        const pendingFriendIDLists = [];
        const pendingFriendInfoLists = [];

        querySnapshot.forEach((documentSnapshot) => {
          pendingFriendIDLists.push(documentSnapshot.id);
        });

        await firebase
          .firestore()
          .collection("users")
          .get()
          .then((snaps) => {
            snaps.forEach((snap) => {
              if (pendingFriendIDLists.includes(snap.id)) {
                pendingFriendInfoLists.push(snap.data());
              }
            });
          });

        onSuccess(pendingFriendInfoLists);
      },
      (error) => {
        onFailure(error);
      }
    );
};

export const fetchFriendRequestsReceived = ({ onSuccess, onFailure }) => {
  const userID = firebase.auth().currentUser.uid;

  return firebase
    .firestore()
    .collection("users")
    .doc(userID)
    .collection("friendRequestsReceived")
    .onSnapshot(
      async (querySnapshot) => {
        const pendingFriendIDLists = [];
        const pendingFriendInfoLists = [];

        querySnapshot.forEach((documentSnapshot) => {
          pendingFriendIDLists.push(documentSnapshot.id);
        });

        await firebase
          .firestore()
          .collection("users")
          .get()
          .then((snaps) => {
            snaps.forEach((snap) => {
              if (pendingFriendIDLists.includes(snap.id)) {
                pendingFriendInfoLists.push(snap.data());
              }
            });
          });

        onSuccess(pendingFriendInfoLists);
      },
      (error) => {
        onFailure(error);
      }
    );
};
