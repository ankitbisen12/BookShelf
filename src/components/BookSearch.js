import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchBook } from "../reducers/bookSearchSlice";
import { addBook } from "../reducers/bookShelfSlice";
import { Link } from "react-router-dom";
import { BookOpenIcon, MagnifyingGlassIcon } from "@heroicons/react/16/solid";

const BookSearch = () => {
  const [bookName, setBookName] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(bookName);
  const books = useSelector((state) => state.bookSearch.searchBooks);
  const dispatch = useDispatch();

  useEffect(() => {
    const savedBooks = JSON.parse(localStorage.getItem("searchBooks"));
    if (savedBooks) {
      dispatch(setSearchBook(savedBooks));
    }
  }, [dispatch]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(bookName);
    }, 1000); // Debounce time set to 1000 ms

    return () => {
      clearTimeout(handler);
    };
  }, [bookName]);

  useEffect(() => {
    const fetchBooks = async () => {
      if (debouncedQuery.length > 2) {
        const response = await fetch(
          `https://openlibrary.org/search.json?q=${debouncedQuery}&limit=10&page=1`
        );
        const data = await response.json();
        dispatch(setSearchBook(data.docs));
      } else {
        dispatch(setSearchBook([]));
      }
    };

    fetchBooks();
  }, [debouncedQuery, dispatch]);

  const handleSearch = (e) => {
    setBookName(e.target.value);
  };

  const addBookByIdToShelf = (book) => {
    dispatch(addBook(book));
  };

  return (
    <div className="">
      <nav className="bg-gray-800 px-2 py-4 md:p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="flex flex-row items-center">
            <MagnifyingGlassIcon className="w-8 h-8 text-white " />
            <h1 className="text-white text-2xl font-semibold">Book Search</h1>
          </Link>
          <Link to="/bookshelf" className="flex flex-row items-center">
            <BookOpenIcon className="w-8 h-8 text-white " />
            <h1 className="text-white text-2xl font-semibold">My Bookshelf</h1>
          </Link>
        </div>
      </nav>
      <div className="flex items-center justify-center p-2 mt-4">
        <div className="flex flex-col justify-center items-center">
          <input
            type="text"
            value={bookName}
            onChange={handleSearch}
            placeholder="Search Here....."
            className="py-2 px-4 w-full mb-4 outline-none border border-gray-400 rounded-full text-lg"
          />
        </div>
      </div>
      <div className="container mx-auto">
        <div>
          {books.length === 0 && (
            <p className="text-center text-xl text-gray-400">
              Please enter the movie
            </p>
          )}
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {books.length !== 0 &&
            books.map((book) => (
              <div
                key={`${book.key}+${book.edition_count}`}
                className="border p-4 rounded-md border-gray-500 text-center"
              >
                <h2 className="text-xl">
                  <strong>Book Title:</strong>
                  {book.title}
                </h2>
                <p className="text-sm">
                  <strong>Edition Count:</strong>
                  {book.edition_count}
                </p>
                <button
                  onClick={() => addBookByIdToShelf(book)}
                  className="mt-2 bg-green-500 text-white py-1 px-4 rounded-md"
                >
                  Add to Bookshelf
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default BookSearch;
