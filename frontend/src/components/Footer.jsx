import { Link } from "react-router-dom";

const Footer = () => (
  <footer className=" bg-gray-100 dark:bg-gray-900 py-6 px-6 text-sm flex justify-between text-gray-600 dark:text-gray-400">
    <div className="max-w-9xl  ">
      © 2024 Read Mints's Book All rights reserved.
    </div>
     <Link to="/add-book">
                    <button className="btn flex justify-end bg-black text-white p-2  px-3 border rounded-full">
                       Add Book
                    </button>
                  </Link>
  </footer>
);

export default Footer;