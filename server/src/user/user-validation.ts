export function isValidUsername(username: string) {
  const minLength = 3;
  const maxLength = 20;
  const usernameRegex = /^[a-zA-Z0-9_]+$/; // Only letters, numbers, and underscores

  if (!username) return false;
  if (username.length < minLength || username.length > maxLength) return false;
  if (!usernameRegex.test(username)) return false;

  return true;
}

export function isValidPassword(password: string) {
  const minLength = 8;
  const hasUppercase = /[A-Z]/;
  const hasLowercase = /[a-z]/;
  const hasNumber = /[0-9]/;
  const hasSpecialChar = /[\W_]/; // non-word character or underscore

  if (!password) return false;
  if (password.length < minLength) return false;
  if (!hasUppercase.test(password)) return false;
  if (!hasLowercase.test(password)) return false;
  if (!hasNumber.test(password)) return false;
  if (!hasSpecialChar.test(password)) return false;

  return true;
}
