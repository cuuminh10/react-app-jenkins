import { combineReducers } from 'redux';
import CustomizerReducer from './customizer/CustomizerReducer';
import chatReducer from './chats/ChatReducer';
import notesReducer from './notes/NotesReducer';
import emailReducer from './email/EmailReducer';
import welcome from './welcome';
import user from './user';

const RootReducers = combineReducers({
  CustomizerReducer,
  chatReducer,
  notesReducer,
  emailReducer,
  welcome,
  user
});

export default RootReducers;
