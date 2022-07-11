import { firebase } from "../Firebase/Config";

export function fetchGroup({ onSuccess, onFailure, app = firebase }) {
  const userID = app.auth().currentUser.uid;
  const db = app.firestore();

  return db
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

        const groupsRef = db.collection("groups");
        const promisedData = groupIDLists.map(async (groupID) => {
          await groupsRef
            .doc(groupID)
            .get()
            .then((doc) => {
              // filter non-exists doc
              if (doc.exists) {
                groupInfoLists.push({ ...doc.data(), id: doc.id });
              }
            });
        });

        await Promise.all(promisedData).then(() => {
          // Sort groups by name
          groupInfoLists.sort((x, y) => (x.name < y.name ? -1 : 1));
          console.log(groupInfoLists);

          onSuccess(groupInfoLists);
        });
      },
      (error) => {
        onFailure(error);
      }
    );
}

export function fetchGroupInvitation({ onSuccess, onFailure, app = firebase }) {
  const userID = app.auth().currentUser.uid;
  const db = app.firestore();

  return db
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

        const groupsRef = db.collection("groups");
        const promisedData = groupIDLists.map(async (groupID) => {
          await groupsRef
            .doc(groupID)
            .get()
            .then((doc) => {
              if (doc.exists) {
                groupInfoLists.push({ ...doc.data(), id: doc.id });
              }
            });
        });

        await Promise.all(promisedData).then(() => {
          // Sort groups by name
          groupInfoLists.sort((x, y) => (x.name < y.name ? -1 : 1));

          onSuccess(groupInfoLists);
        });
      },
      (error) => {
        onFailure(error);
      }
    );
}

export function checkGroupInvitation({
  onFound,
  onNotFound,
  onFailure,
  app = firebase
}) {
  const userID = app.auth().currentUser.uid;
  const db = app.firestore();

  return db
    .collection("users")
    .doc(userID)
    .collection("groupInvited")
    .onSnapshot(
      async (querySnapshot) => {
        if (querySnapshot.size !== 0) {
          const groupIDLists = [];
          let isInvitationExist = false;

          querySnapshot.forEach((documentSnapshot) => {
            groupIDLists.push(documentSnapshot.id);
          });

          const groupsRef = db.collection("groups");
          const promisedData = groupIDLists.map(async (groupID) => {
            await groupsRef
              .doc(groupID)
              .get()
              .then((doc) => {
                if (doc.exists) {
                  isInvitationExist = true;
                }
              });
          });

          await Promise.all(promisedData).then(() => {
            console.log(isInvitationExist);
            isInvitationExist ? onFound() : onNotFound();
          });
        } else {
          onNotFound();
        }
      },
      (error) => {
        onFailure(error);
      }
    );
}

export function fetchGroupInfo({
  groupID,
  onSuccess,
  onFailure,
  app = firebase
}) {
  return app
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

export function fetchGroupMembers({
  groupID,
  onSuccess,
  onFailure,
  app = firebase
}) {
  const db = app.firestore();

  return db
    .collection("groups")
    .doc(groupID)
    .collection("members")
    .onSnapshot(
      async (querySnapshot) => {
        const memberIDLists = [];
        const memberInfoLists = [];

        querySnapshot.forEach((documentSnapshot) => {
          memberIDLists.push(documentSnapshot.id);
        });

        const promisedData = memberIDLists.map(async (memberID) => {
          await db
            .collection("users")
            .doc(memberID)
            .get()
            .then((doc) => {
              if (doc.exists) {
                memberInfoLists.push({
                  id: doc.id,
                  username: doc.data().username,
                  bio: doc.data().bio,
                  img: doc.data().img
                });
              }
            });
        });

        await Promise.all(promisedData).then(() => {
          memberInfoLists.sort((x, y) => (x.username < y.username ? -1 : 1));

          onSuccess(memberInfoLists);
        });
      },
      (error) => {
        onFailure(error);
      }
    );
}

export function fetchPendingGroupMembers({
  groupID,
  onSuccess,
  onFailure,
  app = firebase
}) {
  const db = app.firestore();

  return db
    .collection("groups")
    .doc(groupID)
    .collection("pendingMembers")
    .onSnapshot(
      async (querySnapshot) => {
        const pendingMemberIDLists = [];
        const pendingMemberInfoLists = [];

        querySnapshot.forEach((documentSnapshot) => {
          pendingMemberIDLists.push(documentSnapshot.id);
        });

        const promisedData = pendingMemberIDLists.map(async (memberID) => {
          await db
            .collection("users")
            .doc(memberID)
            .get()
            .then((doc) => {
              if (doc.exists) {
                pendingMemberInfoLists.push({
                  id: doc.id,
                  username: doc.data().username,
                  img: doc.data().img
                });
              }
            });
        });

        await Promise.all(promisedData).then(() => {
          pendingMemberInfoLists.sort((x, y) =>
            x.username < y.username ? -1 : 1
          );

          onSuccess(pendingMemberInfoLists);
        });
      },
      (error) => {
        onFailure(error);
      }
    );
}
