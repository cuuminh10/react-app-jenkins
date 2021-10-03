import axios from 'axios';
import { store } from 'src/redux/Store';

const baseURL = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_BASE_URL : process.env.REACT_APP_DEV_BASE_URL;

const defaultOptions = {
  baseURL,
  headers: {
    'Content-type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
  }
};

// Create instance
const instance = axios.create(defaultOptions);

instance.interceptors.request.use((config) => {
  const { user } = store.getState();
  const token = user ? user.token : '';
  // eslint-disable-next-line no-param-reassign
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

export default instance;
