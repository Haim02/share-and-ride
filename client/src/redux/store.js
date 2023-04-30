// import { configureStore, combineReducers } from "@reduxjs/toolkit";
// import homePageSlice from "./homePageSlice";
// import authSlice from "./auth";
// import locationSlice from "./location";
// import productSlice from './products';

// const rootReducer = combineReducers({
//   homePage: homePageSlice.reducer,
//   auth: authSlice.reducer,
//   // location: locationSlice.reducer,
//   // product: productSlice.reducer
// });

// const store = configureStore({
//   reducer: rootReducer,
// });

// export default store;

// import { configureStore, combineReducers } from "@reduxjs/toolkit";
// import homePageSlice from "./homePageSlice";
// import authSlice from "./auth";
// import locationSlice from "./location";
// import productSlice from './products';

// const rootReducer = combineReducers({
//   homePage: homePageSlice.reducer,
//   auth: authSlice.reducer,
//   location: locationSlice.reducer,
//   product: productSlice.reducer
// });

// const store = configureStore({
//   reducer: rootReducer,
// });

// export default store;

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import homePageSlice from "./slice/homePageSlice";
import authSlice from "./slice/auth";
import productSlice from "./slice/products";
import userProfile from "./slice/user";
import messagesSlice from "./slice/messages";
import requestsSlice from "./slice/request";
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
import storageSession from "redux-persist/lib/storage/session";
import { CookieStorage } from "redux-persist-cookie-storage";
import storage from "redux-persist/lib/storage/session";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  // storageSession
};

const rootReducer = combineReducers({
  homePage: homePageSlice.reducer,
  auth: authSlice.reducer,
  product: productSlice.reducer,
  userProfile: userProfile.reducer,
  message: messagesSlice.reducer,
  request: requestsSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// export default store;
export let persistor = persistStore(store);
