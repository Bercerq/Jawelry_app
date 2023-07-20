import { combineReducers } from "redux";
import productReducer from "./product";

export const rootReducer = combineReducers({
  productReducer,
});
