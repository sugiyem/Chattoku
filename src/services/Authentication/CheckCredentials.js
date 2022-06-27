export function isPasswordTooShort(password) {
  return password.length < 6;
}

// A str is considered a valid email if it is in the form of
// anystring@anystring.anystring
export function isValidEmail(str) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(str);
}
