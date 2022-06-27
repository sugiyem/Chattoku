import {
  isPasswordTooShort,
  isValidEmail
} from "../../../src/services/Authentication/CheckCredentials";

describe("Test credentials validation", () => {
  test("String with less than 6 characters is invalid password", () => {
    const result = !isPasswordTooShort("berts");
    expect(result).toBeFalsy();
  });

  test("yemyem is a valid password", () => {
    const result = !isPasswordTooShort("yemyem");
    expect(result).toBeTruthy();
  });

  test("Empty string is invalid email", () => {
    expect(isValidEmail("")).toBeFalsy();
  });

  test("String without '@' is invalid email", () => {
    expect(isValidEmail("chattoku")).toBeFalsy();
  });

  test("String with more than one '@' is invalid email", () => {
    expect(isValidEmail("chattoku@chattoku@chattoku")).toBeFalsy();
  });

  test("String without '.' after '@' is invalid email", () => {
    expect(isValidEmail("chattoku@chattoku")).toBeFalsy();
  });

  test("chattoku@chattoku.com is valid email", () => {
    expect(isValidEmail("chattoku@chattoku.com")).toBeTruthy();
  });
});
