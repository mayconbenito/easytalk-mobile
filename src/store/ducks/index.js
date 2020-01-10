import { combineReducers } from 'redux';

import chat from './chat';
import contact from './contact';
import login from './login';
import message from './message';
import register from './register';
import session from './session';

export default combineReducers({
  session,
  login,
  register,
  chat,
  contact,
  message,
});
