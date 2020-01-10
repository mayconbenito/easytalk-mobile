import AsyncStorage from '@react-native-community/async-storage';
import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';

import reducers from './ducks';
import sagas from './sagas';

const persistConfig = {
  key: 'root',
  whitelist: ['session', 'chats', 'contacts'],
  storage: AsyncStorage,
};

const sagaMiddleware = createSagaMiddleware();
const persistedReducer = persistReducer(persistConfig, reducers);
const store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));
const persistor = persistStore(store);

sagaMiddleware.run(sagas);

export { store, persistor };
