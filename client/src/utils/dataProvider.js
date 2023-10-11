import jwt_decode from 'jwt-decode';

export const getUserData = (token) => {
  if (token) {
    const tempUser = jwt_decode(token);
    return { ...tempUser };
  }
};
