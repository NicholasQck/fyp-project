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
    console.log(roleID);
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

export const userEditFormValidation = (userInput, setError) => {
  const { userID, roleID, fName, lName } = userInput;

  if (!userID || !roleID || !fName || !lName) {
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

  const courseValid = course.match(/^[a-zA-Z()\s]+$/);
  const descBriefValid = descBrief.match(/^[\w\s.,!?'"()-]+$/);
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

export const genTitleFormValidation = (genKeyword, setError) => {
  if (!genKeyword) {
    setError({
      show: true,
      type: 'fail',
      msg: 'Please enter a keyword to get suggestions',
      generative: true,
    });
    return false;
  }

  const keywordValid = genKeyword.match(/^[a-zA-Z0-9\s]+$/);

  if (!keywordValid) {
    setError({
      show: true,
      type: 'fail',
      msg: 'Please provide a valid keyword',
      generative: true,
    });
    return false;
  }
  return true;
};

export const titleFormValidation = (titleDetails, setError) => {
  const { proposedBy, titleName, fieldArea, titleDesc } = titleDetails;

  if (!proposedBy || !titleName || !fieldArea || !titleDesc) {
    setError({
      show: true,
      type: 'fail',
      msg: 'Please ensure all fields are provided',
    });
    return false;
  }

  const titleNameValid = titleName.match(/^[\w\s.,!?@%&'"():-]+$/);
  const fieldAreaValid = fieldArea.match(/^[a-zA-Z0-9\s]+$/);
  const titleDescValid = titleDesc.match(/^[\w\s.,!?@%&'"():-]+$/);

  if (!titleNameValid) {
    setError({
      show: true,
      type: 'fail',
      msg: 'Please provide a valid project title',
    });
    return false;
  }

  if (!fieldAreaValid) {
    setError({
      show: true,
      type: 'fail',
      msg: 'Please provide a valid project field',
    });
    return false;
  }

  if (!titleDescValid) {
    setError({
      show: true,
      type: 'fail',
      msg: 'Please provide a valid description for the project',
    });
    return false;
  }
  return true;
};
