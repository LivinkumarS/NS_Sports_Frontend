import React, { useState } from "react";
import { json, Link, useNavigate } from "react-router-dom";
import { Label, TextInput, Button, Alert } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import Oath from "../components/Oauth";

export default function SignIn() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const apiURL = import.meta.env.VITE_API_URL;

  function handleChange(e) {
    const trigger = e.target;
    setFormData((prev) => {
      return {
        ...prev,
        [trigger.id]: trigger.value,
      };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    dispatch(signInStart());
    if (
      !formData.email ||
      !formData.password ||
      formData.email === "" ||
      formData.password === ""
    ) {
      dispatch(signInFailure("All Fields Are Required"));
    }

    try {
      const res = await fetch(`${apiURL}/api/auth/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData }),
      });
      const response = await res.json();

      if (response.success === false) {
        dispatch(signInFailure(response.message));
      }
      if (res.ok) {
        const { accessToken, ...signData } = response;
        dispatch(signInSuccess(signData));
        localStorage.setItem("access_token", accessToken);
        navigate("/");
      }
    } catch (err) {
      dispatch(signInFailure(err.message));
    }
    setFormData({ email: "", password: "" });
  }

  return (
    <div className="min-h-[85vh] my-5 sm:m-0 sm:flex sm:items-center sm:justify-center">
      <div className="gap-5 flex p-3 max-w-4xl mx-auto flex-col md:flex-row md:items-center">
        {/* left-side  */}
        <div className="flex-1">
          <Link to="/">
            <img
              src="/NS_logo_blue.png"
              alt=""
              className=" rounded-lg w-[70px] sm:w-[100px] h-auto p-2"
            />
          </Link>
          <p className="mt-4">
            <h1 className="font-bold text-lg">Welcome to NS Sports!</h1>
            Log in to access live match scores, player stats, and match news.
            Get real-time updates, engage with blogs, and enjoy a personalized
            experience. Your data security is our priority. Sign in now to stay
            connected with all the latest action!
          </p>
        </div>
        {/* right-side  */}
        <div className="flex-1">
          <form onSubmit={handleSubmit}>
            <div className="">
              <Label value="Email" />
              <TextInput
                type="text"
                placeholder="something@hello.com"
                id="email"
                onChange={handleChange}
                value={formData.email}
              />
            </div>
            <div className="">
              <Label value="Password" />
              <TextInput
                type="password"
                placeholder="******"
                id="password"
                onChange={handleChange}
                value={formData.password}
              />
            </div>
            <Button
              className="mx-auto my-4 w-full bg-[#0077b6]"
              size="sm"
              type="submit"
              isProcessing={loading}
            >
              Submit
            </Button>
            <Oath />
            <div className="gap-2 flex">
              <span>Don't Have an account?</span>
              <Link className="text-blue-600" to="/sign-up">
                Sign Up
              </Link>
            </div>
          </form>
          {errorMessage && (
            <Alert color="red" className="mt-2">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
