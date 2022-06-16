import {
  isValidUsername,
  isUsernameTaken
} from "../../../src/services/Authentication/CheckUsername";
import { mockFirebase } from "firestore-jest-mock";
import { fakeFirebase } from "../../Helper";

mockFirebase(fakeFirebase);

describe("Test Username", () => {
  const admin = require("firebase-admin");
  admin.initializeApp();

  test("Empty string is invalid username", () => {
    expect(isValidUsername("")).toBeFalsy();
  });

  test("String with non-alphanumeric character is invalid username", () => {
    expect(isValidUsername("&chattoku*")).toBeFalsy();
  });

  test("Sugiyem is a valid username", () => {
    expect(isValidUsername("Sugiyem")).toBeTruthy();
  });

  test("Username Yemima is already taken", async () => {
    const result = await isUsernameTaken("Yemima", admin);
    expect(result).toBeTruthy();
  });

  test("Username Yem is not yet taken", async () => {
    const result = await isUsernameTaken("Yem", admin);
    expect(result).toBeFalsy();
  });
});
