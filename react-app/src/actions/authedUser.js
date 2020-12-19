import { _getUserDataById } from '../utils/API';

export const AUTHENTICATE_USER = 'AUTHENTICATE_USER';

export const authenticateUser = (user) => ({
  type: AUTHENTICATE_USER,
  user,
});

export const handleUserAuthentication = (userId) => {
  return (dipsatch) => {
    _getUserDataById(userId).then((data) => {
      dipsatch(authenticateUser(data));
    });
  };
};
