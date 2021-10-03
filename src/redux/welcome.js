import {
  GET_MEMBER, GET_EXAMPLE, GET_STATUS, ADD_SNACK_BAR, UPDATE_SNACK_BAR
} from 'src/actions/types';

const initialState = {
  title: 'Welcome to GMC ERP Web',
  members: [],
  examples: [],
  status: [],
  locations: ['Tầng 1', 'Tầng 2', 'Tầng 3', 'Tầng 4'],
  roles: ['Leader', 'Dev'],
  snacks: [],
  setSnack: () => {}
};

function welcomeReducer(welcome = initialState, action) {
  const { type, payload } = action;
  let snacks = [];
  switch (type) {
    case GET_MEMBER:
      return { ...welcome, members: payload };
    case GET_EXAMPLE:
      return { ...welcome, examples: payload };
    case GET_STATUS:
      return { ...welcome, status: payload };
    case ADD_SNACK_BAR:
      snacks = [...welcome.snacks];
      snacks.push({ ...payload, key: snacks.length + 1, open: true });
      return { ...welcome, snacks };
    case UPDATE_SNACK_BAR:
      const { key, value } = payload;
      snacks = [...welcome.snacks];
      const index = snacks.findIndex((item) => item.key === key);
      snacks[index] = { ...snacks[index], ...value };
      return { ...welcome, snacks };
    default:
      return welcome;
  }
}

export default welcomeReducer;
