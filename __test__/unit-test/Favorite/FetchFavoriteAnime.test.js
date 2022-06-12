import FetchFavoriteAnime from "../../../src/firebase/FetchFavoriteAnime";
import { mockFirebase } from "firestore-jest-mock";
import { fakeFirebase, flushPromises, options } from "../../Helper";

mockFirebase(fakeFirebase, options);

describe("Test favorite anime fetching", () => {
  const admin = require("firebase-admin");
  admin.initializeApp();

  test("Can fetch all favorite anime of user", async () => {
    let result = [];

    FetchFavoriteAnime({
      onSuccesfulFetch: (data) => {
        result = data;
      },
      onFailure: (error) => console.log(error),
      app: admin
    });

    await flushPromises();

    expect(result).toContainEqual({
      id: "50265",
      title: "Spy x Family",
      image: "first-image-link",
      url: "first-url"
    });
    expect(result).toContainEqual({
      id: "9253",
      title: "Steins;Gate",
      image: "steins-gate-link",
      url: "steins-gate-url"
    });
  });
});
