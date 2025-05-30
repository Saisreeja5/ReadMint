import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "../components/protectedRoute";
import Books from "../pages/Books";
import AddBook from "../pages/AddBook";
import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import BookDetails from "../pages/BookDetails";
// etc...

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/signin" element={<SignIn />} />

      {/* Protected Routes */}
      <Route
        path="/books"
        element={
          <ProtectedRoute>
            <Books />
          </ProtectedRoute>
        }
      />
      <Route
        path="/book/:id"
        element={
          <ProtectedRoute>
            <BookDetails />
          </ProtectedRoute>
        }
      />
      <Route
        path="/add-book"
        element={
          <ProtectedRoute>
            <AddBook />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
