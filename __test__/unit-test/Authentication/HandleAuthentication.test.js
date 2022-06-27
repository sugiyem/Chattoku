import {
  login,
  signOut,
  signUp
} from "../../../src/services/Authentication/HandleAuthentication";
import { mockFirebase } from "firestore-jest-mock";

mockFirebase({
  currentUser: { uid: "chattoku-id" }
});

describe("Test Authentication Handling", () => {
  const {
    mockSignInWithEmailAndPassword,
    mockCreateUserWithEmailAndPassword,
    mockSignOut
  } = require("firestore-jest-mock/mocks/auth");
  const { mockSet } = require("firestore-jest-mock/mocks/firestore");
  const admin = require("firebase-admin");
  admin.initializeApp();
  const db = admin.firestore();

  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("Can login", async () => {
    await login(
      { email: "chattoku@chattoku.com", password: "chattokucp2106" },
      () => {},
      "team-w",
      true,
      admin
    );

    console.log(admin.auth().currentUser.tes);

    expect(mockSignInWithEmailAndPassword).toHaveBeenCalledWith(
      "chattoku@chattoku.com",
      "chattokucp2106"
    );
    expect(mockSet).toHaveBeenCalledWith(
      { notificationToken: "team-w" },
      { merge: true }
    );
  });

  test("Can sign up", async () => {
    await signUp(
      {
        username: "chattoku-test",
        email: "chattoku@chattoku.com",
        password: "chattokucp2106"
      },
      () => {},
      admin
    );

    expect(mockCreateUserWithEmailAndPassword).toHaveBeenCalledWith(
      "chattoku@chattoku.com",
      "chattokucp2106"
    );
    expect(mockSet).toHaveBeenCalledWith({
      username: "chattoku-test",
      bio: "",
      img: "",
      genres: [],
      friends: [],
      id: "chattoku-id"
    });
  });

  test("Can sign out", () => {
    signOut(admin);

    expect(mockSignOut).toHaveBeenCalled();
  });
});
