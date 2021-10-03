import {
  SET_USER
} from 'src/actions/types';

const getUserStorage = () => {
  const userString = localStorage.getItem('user');
  const user = JSON.parse(userString);
  return user;
};

const initialState = getUserStorage();

function userReducer(user = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_USER:
      return payload;
    default:
      return user;
  }
}

export default userReducer;
