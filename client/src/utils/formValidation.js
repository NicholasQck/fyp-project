export const userFormValidation = (userInput, setError) => {
  const { userID, roleID, fName, lName, password, passwordConfirm } = userInput;

  if (!userID || !roleID || !fName || !lName || !password || !passwordConfirm) {
    setError({
      show: true,
      type: 'fail',
      msg: 'Please ensure all fields are provided',
    });
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
    setError({
      show: true,
      type: 'fail',
      msg: 'User ID should only contain alphanumeric characters',
    });
    return false;
  }

  if (!fNameValid) {
    setError({
      show: true,
      type: 'fail',
      msg: 'First name should not contain special characters',
    });
    return false;
  }

  if (!lNameValid) {
    setError({
      show: true,
      type: 'fail',
      msg: 'Last name should not contain special characters',
    });
    return false;
  }

  if (!roleIDValid) {
    setError({ show: true, type: 'fail', msg: 'Please select a proper role' });
    return false;
  }

  if (!passwordValid) {
    setError({
      show: true,
      type: 'fail',
      msg: 'Password should be 8 - 16 characters in length',
    });
    return false;
  }

  if (password !== passwordConfirm) {
    setError({ show: true, type: 'fail', msg: 'Passwords do not match' });
    return false;
  }

  return true;
};

export const loginFormValidation = (loginData, setError) => {
  const { username, pass } = loginData;

  if (!username || !pass) {
    setError({
      show: true,
      type: 'fail',
      msg: 'Please ensure all fields are provided',
    });
    return false;
  }

  const userIDValid = username.match(/^[a-z0-9]+$/);
  const passwordValid = pass.match(
    /^[a-zA-Z0-9!@#$%^&*()-_=+[\]{}|;:'",.<>?/\\~`]+$/
  );

  if (!userIDValid) {
    setError({
      show: true,
      type: 'fail',
      msg: 'Please enter a valid username',
    });
    return false;
  }

  if (!passwordValid) {
    setError({
      show: true,
      type: 'fail',
      msg: 'Please enter a valid password',
    });
    return false;
  }

  return true;
};

export const safFormValidation = (safData, setError) => {
  const { studentID, titleID, course, descBrief, hrPerWeek, priorSubmission } =
    safData;

  if (
    !studentID ||
    !titleID ||
    !course ||
    !descBrief ||
    !hrPerWeek ||
    !priorSubmission
  ) {
    setError({
      show: true,
      type: 'fail',
      msg: 'Please ensure all fields are provided',
    });
    return false;
  }

  const courseValid = course.match(/^[a-zA-Z()\s]*$/);
  const descBriefValid = descBrief.match(/^[\w\s.,!?'"()-]*$/);
  const hrPerWeekValid = hrPerWeek.match(/^[0-9]+$/);
  const priorSubmissionValid = priorSubmission.match(/^[0-9]+$/);

  if (!courseValid) {
    setError({
      show: true,
      type: 'fail',
      msg: 'Please provide a valid course name',
    });
    return false;
  }

  if (!descBriefValid) {
    setError({
      show: true,
      type: 'fail',
      msg: 'Descriptions should not contain special characters',
    });
    return false;
  }

  if (!hrPerWeekValid) {
    setError({
      show: true,
      type: 'fail',
      msg: 'Please provide a valid number',
    });
    return false;
  }

  if (!priorSubmissionValid) {
    setError({
      show: true,
      type: 'fail',
      msg: 'Please provide a valid number',
    });
    return false;
  }

  return true;
};
