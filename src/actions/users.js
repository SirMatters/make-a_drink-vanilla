import { _updateUser, _getUsers } from '../utils/API';

export const GET_USERS = 'GET_USERS';
export const UPDATE_USER = 'UPDATE_USER';

export const getUsers = (users) => ({
  type: GET_USERS,
  users,
});

export const handleGetUsers = () => {
  return (dispatch) => {
    _getUsers()
      .then(({ users }) => {
        dispatch(getUsers(users));
      })
      .catch((err) => {
        console.warn('Catched inn handleGetUsers()', err);
      });
  };
};

export const updateUser = (user) => ({
  type: UPDATE_USER,
  user,
});

export const handleUserUpdate = (newData) => {
  return (dispatch) => {
    // TODO: consider API did not return positevely
    _updateUser(newData)
      .then(() => {
        dispatch(updateUser(newData));
      })
      .catch((err) => {
        alert('Catched in handleUserUpdate()', err);
        console.log('Catched in handleUserUpdate()', err);
      });
  };
};
