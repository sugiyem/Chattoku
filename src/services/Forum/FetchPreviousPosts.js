import { firebase } from "../Firebase/Config";

export function FetchPreviousPosts(callbackSuccess, app = firebase) {
  const currentUID = app.auth().currentUser.uid;
  let db = app.firestore();

  return db
    .collection("users")
    .doc(currentUID)
    .collection("posts")
    .onSnapshot(async (querySnapshot) => {
      const data = [];
      const fetchedData = [];

      //First get the forumId and the postId
      querySnapshot.forEach((docSnapshot) => {
        data.push(docSnapshot.data());
      });

      //Sort based on timestamp
      data.sort((x, y) => (x.timestamp > y.timestamp ? -1 : 1));

      let forumRef = db.collection("forums");

      //Make an array of promise to fecth forum data and post data
      const PromisedData = data.map(async (ids) => {
        const result = {};
        await forumRef
          .doc(ids.forumId)
          .get()
          .then((doc) => {
            result.forumData = { ...doc.data(), id: ids.forumId };
          });

        await forumRef
          .doc(ids.forumId)
          .collection("posts")
          .doc(ids.postId)
          .get()
          .then((doc) => {
            const data = doc.data();
            const timestamp = data.timestamp;
            const date = new Date(
              timestamp.seconds * 1000 + timestamp.nanoseconds * 0.000001
            );

            const lastEdited = data.lastEdited;
            const editedDate = lastEdited
              ? new Date(
                  lastEdited.seconds * 1000 + timestamp.nanoseconds * 0.000001
                )
              : null;

            result.postData = {
              ...data,
              postId: ids.postId,
              forumId: ids.forumId,
              timestamp: date,
              lastEdited: editedDate
            };
          });

        fetchedData.push(result);
      });

      //Wait for  all of the promise to finish
      await Promise.all(PromisedData).then(() => callbackSuccess(fetchedData));
    });
}
