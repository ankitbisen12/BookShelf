import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchBooks: JSON.parse(localStorage.getItem("searchBooks")) || [],
};

const bookSearchSlice = createSlice({
  name: "searchBook",
  initialState,
  reducers: {
    setSearchBook: (state, action) => {
      state.searchBooks = action.payload;
      localStorage.setItem("searchBooks", JSON.stringify(state.searchBooks));
    },
  },
});

export const { setSearchBook } = bookSearchSlice.actions;
export default bookSearchSlice.reducer;

