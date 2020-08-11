export const AUTHENTICATE_USER = 'AUTHENTICATE_USER';

export const authenticateUser = (user) => ({
  type: AUTHENTICATE_USER,
  user,
});
