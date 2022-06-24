import { firebase } from "../Firebase/Config";

const FetchForumData = (onSuccesfulFetch, onFailure) => {
  return firebase
    .firestore()
    .collection("forums")
    .onSnapshot(
      (querySnapshot) => {
        const forums = [];
        querySnapshot.forEach((documentSnapshot) => {
          console.log(documentSnapshot);
          forums.push({ ...documentSnapshot.data(), id: documentSnapshot.id });
        });
        console.log(forums);
        console.log(onSuccesfulFetch);
        onSuccesfulFetch(forums);
      },
      (error) => onFailure(error)
    );
};

export default FetchForumData;
