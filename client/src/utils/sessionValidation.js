import jwt_decode from 'jwt-decode';
export const validateSession = () => {
  const user = JSON.parse(sessionStorage.getItem('user'));

  if (user) {
    const decodedUser = jwt_decode(user.token);
    const { exp } = decodedUser;
    // convert exp to milliseconds
    const expDateTime = new Date(exp * 1000);
    const currentDateTime = new Date();
    if (currentDateTime > expDateTime) {
      sessionStorage.removeItem('user');
    }
    return user.token;
  }
  return null;
};
