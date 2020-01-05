import { combineReducers } from 'redux';

import chat from './chat';
import contact from './contact';
import login from './login';
import session from './session';

export default combineReducers({
  session,
  login,
  chat,
  contact,
});
