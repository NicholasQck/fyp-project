export const userFormValidation = (userInput, setError) => {
  const { userID, roleID, fName, lName, password, passwordConfirm } = userInput;

  if (!userID || !roleID || !fName || !lName || !password || !passwordConfirm) {
    setError(true, 'Please ensure all fields are provided');
    return false;
  }

  const userIDValid = userID.match(/^[a-z0-9]+$/);
  const roleIDValid = roleID.match(/^[1-3]$/);
  const fNameValid = fName.match(
    /^[A-Za-z]+([-'\s]?[A-Za-z]+)?([-'\s]?[A-Za-z]+)?$/
  );
  const lNameValid = lName.match(
    /^[A-Za-z]+([-'\s]?[A-Za-z]+)?([-'\s]?[A-Za-z]+)?$/
  );
  const passwordValid = password.match(
    /^[a-zA-Z0-9!@#$%^&*()-_=+[\]{}|;:'",.<>?/\\~`]{8,16}$/
  );

  if (!userIDValid) {
    setError(true, 'User ID should only contain alphanumeric characters');
    return false;
  }

  if (!fNameValid) {
    setError(true, 'First name should not contain special characters');
    return false;
  }

  if (!lNameValid) {
    setError(true, 'Last name should not contain special characters');
    return false;
  }

  if (!roleIDValid) {
    setError(true, 'Please select a proper role');
    return false;
  }

  if (!passwordValid) {
    setError(true, 'Password should be 8 - 16 characters in length');
    return false;
  }

  if (password !== passwordConfirm) {
    setError(true, 'Passwords do not match');
    return false;
  }
  return true;
};
