import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import RootReducers from './Rootreducers';

const initialState = {};

export const store = createStore(
  RootReducers,
  initialState,
  composeWithDevTools(applyMiddleware(thunk)),
);
