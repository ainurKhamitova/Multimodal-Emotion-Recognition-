import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { useDispatch } from 'react-redux'; // Import useDispatch hook

import authReducer from './slices/authSlice';
import videoReducer from './slices/videoSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  video: videoReducer,
  // Other reducers if any
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export default store;

