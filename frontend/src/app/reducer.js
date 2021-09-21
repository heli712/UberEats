import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "../features/userReducer";
import resReducer from "../features/resReducer";
import resdReducer from "../features/resdReducer";
import detailsReducer from "../features/detailsReducer"
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";

const rootReducer = combineReducers({
  user: userReducer,
  userDetails : detailsReducer,
  resturant : resReducer,
  restDetails: resdReducer
});

const persistConfig = { key: "root", storage };

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunkMiddleware)));
export const persistor = persistStore(store);