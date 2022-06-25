import {
  addAnimeToFavorite,
  addGenreToFavorite,
  removeAnimeFromFavorite,
  removeGenreFromFavorite
} from "../../../src/services/Anime/HandleFavorite";
import { mockFirebase } from "firestore-jest-mock";
import { fakeFirebase } from "../../Helper";

mockFirebase(fakeFirebase);

describe("Test Favorite Anime & Genre Handling", () => {
  const {
    mockCollection,
    mockDoc,
    mockDelete,
    mockSet,
    mockUpdate
  } = require("firestore-jest-mock/mocks/firestore");
  const admin = require("firebase-admin");
  admin.initializeApp();

  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("Can add anime to favorite", async () => {
    await addAnimeToFavorite(
      {
        mal_id: 42938,
        title: "Fruit Basket: The Final",
        images: { jpg: { image_url: "new-image-link" } },
        url: "new-url"
      },
      admin
    );

    expect(mockSet).toHaveBeenCalledWith({
      id: 42938,
      title: "Fruit Basket: The Final",
      image: "new-image-link",
      url: "new-url"
    });
  });

  test("Can remove anime from favorite", async () => {
    await removeAnimeFromFavorite("50265", admin);

    expect(mockCollection).toHaveBeenNthCalledWith(1, "users");
    expect(mockCollection).toHaveBeenNthCalledWith(2, "anime");
    expect(mockDoc).toHaveBeenNthCalledWith(1, "yem123");
    expect(mockDoc).toHaveBeenNthCalledWith(2, "50265");
    expect(mockDelete).toHaveBeenCalledWith();
  });

  test("Can add genre to favorite", async () => {
    await addGenreToFavorite("Psychological", admin);

    expect(mockUpdate).toHaveBeenCalledWith({
      genres: admin.firestore.FieldValue.arrayUnion("Psychological")
    });
  });

  test("Can remove genre from favorite", async () => {
    await removeGenreFromFavorite("Action", admin);

    expect(mockUpdate).toHaveBeenCalledWith({
      genres: admin.firestore.FieldValue.arrayRemove("Action")
    });
  });
});
