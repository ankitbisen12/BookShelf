import { configureStore } from "@reduxjs/toolkit";
import bookShelfReducer from "../reducers/bookShelfSlice";
import bookSearchReducer from "../reducers/bookSearchSlice";

const store = configureStore({
  reducer: {
    bookSearch: bookSearchReducer,
    bookShelf: bookShelfReducer,
  },
});

export default store;
