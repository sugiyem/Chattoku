import { firebase } from "../../firebase/Config";

const FetchForumData = (onSuccesfulFetch, onFailure) => {
  firebase
    .firestore()
    .collection("forums")
    .onSnapshot((querySnapshot) => {
      const forums = [];
      querySnapshot.forEach((documentSnapshot) => {
        forums.push(documentSnapshot.data());
      });

      onSuccesfulFetch(forums);
    }, onFailure);
};
