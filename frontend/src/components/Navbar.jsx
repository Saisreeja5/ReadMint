import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { motion } from 'framer-motion';
import { useAuthContext } from "../context/AuthContext";

const NavBar = () => {
  const { user, logout } = useAuthContext();

  return (
    <nav className="flex items-center justify-between py-3 shadow">
      <div className="flex items-center gap-5 ml-4 ">
      <div className="relative size-10">
      <motion.div
        className="absolute inset-0 rounded-md bg-black"
        animate={{ rotate: [0, 10, 0] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
          }}
         />
       <span className="absolute inset-0 flex items-center justify-center font-bold text-white">
           R
       </span>
      </div>
        <Link to="/home" className="text-xl font-bold ml-2 ">
          ReadMint
        </Link>
      </div>
      <div className="flex gap-4 items-center mr-10">
        
        {user ? (
          <>
            
            
            <Link to="/books" className="btn bg-black text-white p-2 px-3 border rounded-lg font-bold">
              Browse
            </Link>
            <button onClick={logout} className="btn bg-black text-white p-2  px-3 border rounded-lg font-bold">
              Logout
            </button>
           
          </>
        ) : (
          <Link to="/signin" className="btn">
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
