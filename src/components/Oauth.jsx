import { Button } from "flowbite-react";
import React from "react";
import { FaGoogle } from "react-icons/fa";
import { FcGoogle } from 'react-icons/fc';
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

export default function Oath() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = getAuth(app);
  async function handleOuthClick() {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider);
      const res = await fetch(
        "/server/api/auth/google",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: resultsFromGoogle.user.displayName,
            email: resultsFromGoogle.user.email,
            profilePhoto: resultsFromGoogle.user.photoURL,
          }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        const { token, ...signData } = data;
        dispatch(signInSuccess(signData));
        localStorage.setItem("access_token",token);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div 
      onClick={handleOuthClick}
      className="cursor-pointer flex items-center justify-center w-full mb-5 px-4 py-2 text-white bg-white border border-gray-300 rounded-lg shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
    >
      <FcGoogle className="w-6 h-6 mr-2" />
      <span className="text-gray-700 font-semibold">Sign in with Google</span>
    </div>
  );
}
