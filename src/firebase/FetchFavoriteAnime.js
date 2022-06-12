import { firebase } from "./Config";

export default FetchFavoriteAnime = ({
  onSuccesfulFetch,
  onFailure,
  app = firebase
}) => {
  const userID = app.auth().currentUser.uid;

  return app
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
