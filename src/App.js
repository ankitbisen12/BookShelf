import { RouterProvider, createBrowserRouter } from "react-router-dom";
import BookSearch from "./components/BookSearch";
import PersonalBookShelf from "./components/PersonalBookShelf";


const router = createBrowserRouter([
  {
    path: "/",
    element: <BookSearch />,
  },
  {
    path: "/bookshelf",
    element: <PersonalBookShelf />
  }
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
