import { firebase } from "../../firebase/Config";

export default FetchFavoriteAnime = ({ onSuccesfulFetch, onFailure }) => {
  const userID = firebase.auth().currentUser.uid;

  return firebase
    .firestore()
    .collection("users")
    .doc(userID)
    .collection("anime")
    .onSnapshot(
      (querySnapshot) => {
        const favorites = [];
        querySnapshot.forEach((documentSnapshot) => {
          favorites.push(documentSnapshot.data());
        });

        onSuccesfulFetch(favorites);
      },
      (error) => {
        onFailure(error);
      }
    );
};
