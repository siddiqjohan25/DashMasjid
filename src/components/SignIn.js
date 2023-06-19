import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../firebase";
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TextInput, Label, Checkbox, Button } from "flowbite-react";

const SignIn = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [load, setLoad] = useState(true);
  const auth = getAuth(app);
  const navigate = useNavigate();
  const signup = () => {
    const e = email;
    const p = password;
    signInWithEmailAndPassword(auth, e, p)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        toast.success("Signed In");
        setTimeout(function () {
          navigate("/");
        }, 1800);
      })
      .catch((error) => {
        toast.error("Wrong Email or Password");
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("password didnt matched");
      });
  };
  const changeemail = (e) => {
    setEmail(e.target.value);
    setLoad(!load);
  };
  const changepassword = (e) => {
    setPassword(e.target.value);
    setLoad(!load);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#02062a] to-[#343857]   py-4 ">
      <div className="lg:flex  sm:block lg:px-40  sm:px-5">
        <div className="w-2/3  mx-auto ">
        <ToastContainer
              position="top-center"
              autoClose={1000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
            />
          <h1 className="text-white text-xl font-semibold">
            <img
              src="./LogoDashMasjid.png"
              alt=""
              className="inline-block w-[50px]"
            />
            <Link className="text-transparent bg-clip-text bg-gradient-to-t from-[#E1C49A] to-amber-200" to={"/"}>
              DASHMASJID
            </Link>
          </h1>

          <div className="justify-center text-white  mt-40">
            <h1 className="text-3xl font-bold">
              Welcome, to{" "}
              <span class="font-bold text-transparent bg-clip-text bg-gradient-to-t from-[#E1C49A] to-amber-200">
                DashMasjid.
              </span>
            </h1>
            &nbsp;
            {/* <h1 className="my-2 font-bold mb-10 mt-3">
              Please enter your details
            </h1> */}
            {/* <label htmlFor="email" className="text-[10px] font-bold">
              EMAIL
            </label> */}
            <form className=" flex-col gap-2">
            <div className="mb-2 block">
              <Label
                htmlFor="email"
                value="Your Email"
                className="text-white font-bold"
              />
            </div>
            <TextInput
              id="email"
              name="email"
              type="email"
              onChange={changeemail}
              value={email}
              placeholder="Email Address"
              required={true}
              className="sm:w-full my-3 lg:w-1/2"
            />
            
            {/* <input
              type="email"
              name="email"
              onChange={changeemail}
              value={email}
              placeholder="Email Adresss"
              className="text-black block my-3 sm:w-full lg:w-1/2 rounded-3xl px-3 py-2 bg-gray-200 border-none"
              id=""
            /> */}
            <span></span>
            <Label
              htmlFor="email"
              value="Your password"
              className="text-white font-bold"
            />
            <TextInput
              id=""
              name="password"
              type="password"
              onChange={changepassword}
              value={password}
              placeholder="Password"
              required={true}
              className="sm:w-full my-3 lg:w-1/2"
            />
            {/* <label htmlFor="email" className="text-[10px] font-bold">
              PASSWORD
            </label> */}
            {/* <input
              type="password"
              name="password"
              onChange={changepassword}
              value={password}
              placeholder="Password"
              className="text-black block my-3 sm:w-full lg:w-1/2 rounded-3xl px-3 py-2 bg-gray-200 border-none"
              id=""
            /> */}
            <div className="flex items-center gap-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember" className="text-white font-bold">
                Remember me
              </Label>
            </div>
            &nbsp;
            <div className="flex items-center gap-2">
              <Button
                onClick={signup}
                
                className="font-extrabold text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 dark:focus:ring-blue-800  rounded-lg text-sm sm:w-full my-3 lg:w-1/2"
              >
                SIGN IN
              </Button>
            </div>
            &nbsp;
            {/* <button
              onClick={signup}
              className="lg:w-1/2 sm:w-full my-4 py-2 bg-black backdrop-blur-2xl bg-opacity-30 border-[1px] rounded-xl">
              Sign in
            </button> */}
            <h2 className="text-gray-300 text-center lg:w-1/2 sm:w-full">
              Don't have an account? <span></span>
              <Link
                className=" text-transparent bg-clip-text bg-gradient-to-t from-[#E1C49A] to-amber-200 font-bold" 
                to={"/signup"}
              >
                Sign up for free
              </Link>
            </h2>
            <h2 className="text-gray-300 text-center lg:w-1/2 sm:w-full">
              <Link
                className="text-transparent bg-clip-text bg-gradient-to-t from-[#E1C49A] to-amber-200 font-bold "
                to={"/forgot-password"}
              >
                Forgot Password?
              </Link>
            </h2>
            </form>
          </div>
          
        </div>

        <div className="mx-auto lg:w-1/2 sm:w-0 ">
          <img
            src="./LogoDashMasjid.png"
            width={550}
            height={550}
            className="mx-auto mt-[180px]"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
