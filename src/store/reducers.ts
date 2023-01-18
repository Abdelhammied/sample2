import { combineReducers } from "redux";
import { bookApi } from "./apis/book/book.api";
import { searchApi } from "./apis/search/search.api";

export default combineReducers({
  [bookApi.reducerPath]: bookApi.reducer,
  [searchApi.reducerPath]: searchApi.reducer,
});
