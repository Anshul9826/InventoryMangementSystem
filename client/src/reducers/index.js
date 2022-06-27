import { combineReducers } from "redux";

import products from "./products";
import categories from "./category"
import auth from "./auth";

export default combineReducers({
  categories,
  products,
  auth
});
