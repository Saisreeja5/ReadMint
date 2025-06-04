import { motion } from "framer-motion";
import { useAuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const { user } = useAuthContext();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get("https://readmint-1.onrender.com/api/books?limit=4");
        setBooks(res.data.books);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <>
      <main className="py-8">
        <section className="relative mx-auto max-w-5xl py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-8 text-center"
          >
            <h1 className="bg-black  bg-clip-text text-5xl font-bold tracking-tight text-transparent sm:text-6xl lg:text-7xl  max-lg:px-4">
              Connect, Share and Trade Your Favourite Reads...
            </h1>
            <p className="max-w-2xl text-lg text-muted-foreground max-sm:px-1">
              Join our community of book lovers. Discover new books, share your favorites, and connect with fellow readers.
            </p>
            <div className="flex gap-4">
              <Link to={user ? "/books" : "/signin"}>
                <button className="btn bg-black text-white p-2 px-4 w-35 border rounded-full">
                  Get Started
                </button>
              </Link>
              <Link to="/add-book">
                <button className="btn bg-black text-white p-2 w-35 px-3 border rounded-full">
                   Add Book
                </button>
              </Link>
             
            </div>
          </motion.div>
        </section>

        {/* Display Books */}
        <section className="max-w-9xl m-auto pt-20 pb-10">
          <h2 className="text-3xl font-bold mb-10 text-center">Popular Books</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
          {books.map((book) => (
           <div
               key={book._id}
               className="rounded-lg shadow-md overflow-hidden bg-white border border-neutral-200 "
           >
          <div className="w-full aspect-[3/4] relative overflow-hidden rounded">
          <img
             src={book.coverImage}
             alt={book.title}
             className="size-full transition-transform duration-300 hover:scale-105"
          />
          </div>

        <div className="p-4">
        <h3 className="text-lg font-semibold">{book.title}</h3>
        <p className="text-sm text-muted-foreground">{book.author}</p>
        <button className="mt-3 text-sm font-medium text-primary hover:underline">
          Read more
        </button>
      </div>
    </div>
  ))}
</div>
        </section>
      </main>
    </>
  );
};

export default Home;
