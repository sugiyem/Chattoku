import { isValidEmail } from "../../../src/components/Authentication/HandleAuthentication";

describe("Test Email", () => {
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
