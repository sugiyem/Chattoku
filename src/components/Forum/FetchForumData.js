import { firebase } from "../../firebase/Config";

const FetchForumData = (onSuccesfulFetch, onFailure) => {
  const forums = [];

  firebase
    .firestore()
    .collection("forums")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((documentSnapshot) => {
        console.log(documentSnapshot);
        forums.push({ ...documentSnapshot.data(), id: documentSnapshot.id });
      });
      console.log(forums);
      console.log(onSuccesfulFetch);
      onSuccesfulFetch(forums);
    })
    .catch((e) => console.error(e));
};

export default FetchForumData;
