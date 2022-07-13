import { firebase } from "../Firebase/Config";

export const fetchFriend = ({ onSuccess, onFailure, app = firebase }) => {
  const userID = app.auth().currentUser.uid;
  const usersRef = app.firestore().collection("users");

  return usersRef
    .doc(userID)
    .collection("friends")
    .onSnapshot(
      async (querySnapshot) => {
        const friendIDLists = [];
        const friendInfoLists = [];

        querySnapshot.forEach((documentSnapshot) => {
          friendIDLists.push(documentSnapshot.id);
        });

        const promisedData = friendIDLists.map(async (friendID) => {
          await usersRef
            .doc(friendID)
            .get()
            .then((doc) => {
              if (doc.exists) {
                friendInfoLists.push(doc.data());
              }
            });
        });

        await Promise.all(promisedData).then(() => {
          // Sort friends by username
          friendInfoLists.sort((x, y) => (x.username < y.username ? -1 : 1));

          onSuccess(friendInfoLists);
        });
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
  const usersRef = app.firestore().collection("users");

  return usersRef
    .doc(userID)
    .collection("friendRequestsSent")
    .onSnapshot(
      async (querySnapshot) => {
        const pendingFriendIDLists = [];
        const pendingFriendInfoLists = [];

        querySnapshot.forEach((documentSnapshot) => {
          pendingFriendIDLists.push(documentSnapshot.id);
        });

        const promisedData = pendingFriendIDLists.map(async (friendID) => {
          await usersRef
            .doc(friendID)
            .get()
            .then((doc) => {
              if (doc.exists) {
                pendingFriendInfoLists.push(doc.data());
              }
            });
        });

        await Promise.all(promisedData).then(() => {
          // Sort pending friends by username
          pendingFriendInfoLists.sort((x, y) =>
            x.username < y.username ? -1 : 1
          );

          onSuccess(pendingFriendInfoLists);
        });
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
  const usersRef = app.firestore().collection("users");

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

        const promisedData = pendingFriendIDLists.map(async (friendID) => {
          await usersRef
            .doc(friendID)
            .get()
            .then((doc) => {
              if (doc.exists) {
                pendingFriendInfoLists.push(doc.data());
              }
            });
        });

        await Promise.all(promisedData).then(() => {
          // Sort pending friends by username
          pendingFriendInfoLists.sort((x, y) =>
            x.username < y.username ? -1 : 1
          );

          onSuccess(pendingFriendInfoLists);
        });
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
