import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { composeWithDevTools } from 'redux-devtools-extension';

const persistConfig = {
  key: 'root',
  whitelist: ['userInfo'],
  storage
};

const enhancedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(enhancedReducer, composeWithDevTools(applyMiddleware(thunk)));
export const persistor = persistStore(store);
