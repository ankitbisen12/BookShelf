import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const PersonalBookShelf = () => {
  const bookShelf = useSelector((state) => state.bookShelf.books);
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">My Bookshelf</h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {bookShelf.length !== 0 &&
          bookShelf.map((book) => (
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
            
            </div>
          ))}
      </div>
      <Link to="/" className="block mt-4 text-xl text-green-600 text-center font-semibold">
        Back to Search
      </Link>
    </div>
  );
};

export default PersonalBookShelf;
