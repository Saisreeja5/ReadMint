import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";

const SignIn = () => {
  const navigate = useNavigate();
  const { setUser } = useAuthContext();

  useEffect(() => {
    /* global google */
    if (window.google) {
      google.accounts.id.initialize({
        client_id:'999927684483-ucopa2fna8alvt2i03b3p41l1g01raqf.apps.googleusercontent.com', // replace with your client ID
        callback: handleCredentialResponse,
      });

      google.accounts.id.renderButton(
        document.getElementById("googleSignInDiv"),
        { theme: "outline", size: "large" }
      );

      // Removed google.accounts.id.prompt(); to disable One Tap
    }
  }, []);

  const handleCredentialResponse = async (response) => {
    try {
      const { credential } = response;

    

      const backendResponse = await axios.post(
        "https://readmint.onrender.com/api/auth/google",
        { token: credential }
      );

      const { user, ttoken } = backendResponse.data;
      console.log(user);
       console.log("JWTT:",ttoken);

      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("jwtToken", ttoken);

      navigate("/home");
    } catch (error) {
      console.error("Google Sign-In failed", error);
      alert("Sign-In failed, please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-20">
      <h1 className=" text-5xl font-bold text-black m-14">Welcome to Read Mint</h1>
      
      <div className="bg-gray-300" id="googleSignInDiv"></div>
    </div>
  );
};

export default SignIn;
