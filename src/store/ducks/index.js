import { combineReducers } from 'redux';

import chat from './chat';
import contact from './contact';

export default combineReducers({
  chat,
  contact,
});
