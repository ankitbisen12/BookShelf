import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  books: JSON.parse(localStorage.getItem("bookShelf")) || [],
};

const bookShelfSlice = createSlice({
  name: "bookshelf",
  initialState,
  reducers: {
    addBook: (state, action) => {
      state.books.push(action.payload);
      localStorage.setItem("bookShelf", JSON.stringify(state.books));
    },
  },
});

export const { addBook } = bookShelfSlice.actions;
export default bookShelfSlice.reducer;
