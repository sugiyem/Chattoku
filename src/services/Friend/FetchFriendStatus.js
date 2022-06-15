import { firebase } from "../Firebase/Config";

export const fetchFriend = ({ onSuccess, onFailure, app = firebase }) => {
  const userID = app.auth().currentUser.uid;

  return app
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

        await app
          .firestore()
          .collection("users")
          .orderBy("username", "asc")
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

export const fetchFriendRequestsSent = ({
  onSuccess,
  onFailure,
  app = firebase
}) => {
  const userID = app.auth().currentUser.uid;

  return app
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

        await app
          .firestore()
          .collection("users")
          .orderBy("username", "asc")
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

export const fetchFriendRequestsReceived = ({
  onSuccess,
  onFailure,
  app = firebase
}) => {
  const userID = app.auth().currentUser.uid;

  return app
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

        await app
          .firestore()
          .collection("users")
          .orderBy("username", "asc")
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

export const checkFriendRequestsReceived = ({
  onFound,
  onNotFound,
  onFailure,
  app = firebase
}) => {
  const userID = app.auth().currentUser.uid;

  return app
    .firestore()
    .collection("users")
    .doc(userID)
    .collection("friendRequestsReceived")
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
};
