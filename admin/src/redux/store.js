import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authSlice from "./slice/auth";
import userSlice from "./slice/user";
import productSlice from "./slice/product";
import homeSlice from "./slice/home";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { apiSlice } from "./apiCalls/apiSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

let rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: authSlice.reducer,
  user: userSlice.reducer,
  product: productSlice.reducer,
  home: homeSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }).concat(apiSlice.middleware),
  devTools: true,
});

export let persistor = persistStore(store);

export const  resetStore = async () => {
  await persistor.purge()
  await persistor.flush()
}