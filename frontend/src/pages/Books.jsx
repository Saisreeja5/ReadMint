import {React, useState,useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Books = () => {

   const [books,setBooks] = useState([]);

   useEffect(() => {
  const fetchBooks = async () => {
    try {
      const response = await axios.get('https://readmint-1.onrender.com/api/books');
      console.log(response);
      setBooks(response.data.books);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  fetchBooks();
}, []);

  return (
    <div>

     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
    {books.map((book) => (
    <div
      key={book._id}
      className="rounded-lg shadow-md overflow-hidden bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800"
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
          <Link 
            to={`/book/${book._id}`} 
            className="mt-3 inline-block text-sm font-medium text-blue-600 hover:underline"
          >
           Read more
          </Link>
      </div>
       
    </div>
  ))}
</div>
      
    </div>
  )
}

export default Books;
