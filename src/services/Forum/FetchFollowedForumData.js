import { firebase } from "../Firebase/Config";

export default function FetchFollowedForumsData(uid, callbackSuccess) {
  let db = firebase.firestore();

  return db
    .collection("users")
    .doc(uid)
    .collection("follows")
    .onSnapshot(async (querySnapshot) => {
      const data = [];
      const forumDatas = [];

      //First get the forumId
      querySnapshot.forEach((docSnapshot) => {
        data.push(docSnapshot.id);
      });

      let forumRef = db.collection("forums");

      //Make an array of promise to fetch forum data
      const PromisedData = data.map(async (forumId) => {
        await forumRef
          .doc(forumId)
          .get()
          .then((doc) => {
            forumDatas.push({ ...doc.data(), id: doc.id });
          });
      });

      //Wait for  all of the promise to finish
      await Promise.all(PromisedData).then(() => callbackSuccess(forumDatas));
    });
}
