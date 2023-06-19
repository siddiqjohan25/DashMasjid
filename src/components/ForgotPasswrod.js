import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../firebase";
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { sendPasswordResetEmail } from "firebase/auth";
import 'react-toastify/dist/ReactToastify.css';
import { TextInput, Label, Checkbox, Button } from "flowbite-react";

const ForgotPasswrod = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [load, setLoad] = useState(true);
  const auth = getAuth(app);
  const navigate = useNavigate();
  const forgot = () => {
    console.log("hello")
    const e = email;
    const p = password;
    sendPasswordResetEmail(auth, e).then((a) => {
      console.log(a)
      toast.success("Email Sent !")
      setTimeout(function () { navigate("/signin") }, 1800);
    })
    .catch((error) => {
      toast.error("Wrong Email");
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("email is not in database");
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
              
              <span class="font-bold text-transparent bg-clip-text bg-gradient-to-t from-[#E1C49A] to-amber-200">
                DashMasjid.
              </span>
            </h1>
            <form className=" flex-col gap-2">
            <h1 className="my-2 font-bold mb-10 mt-3">
              Please enter your email
            </h1>
            <Label
              htmlFor="email"
              value="Your password"
              className="text-white font-bold"
            />
            <TextInput
              id=""
              type="email"
              name="email"
              onChange={changeemail}
              value={email}
              placeholder="Email Address"
              required={true}
              className="sm:w-full my-3 lg:w-1/2"
            />
            {/* <label htmlFor="email" className="text-[10px] font-bold">
              EMAIL
            </label>
            <input
              type="email"
              name="email"
              onChange={changeemail}
              value={email}
              placeholder="Email Adresss"
              className="text-black block my-3 sm:w-full lg:w-1/2 rounded-3xl px-3 py-2 bg-gray-200 border-none"
              id=""
              required={true}
            /> */}

            <Button
                onClick={forgot}
                
                className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 dark:focus:ring-blue-800 font-medium rounded-lg text-sm sm:w-full my-3 lg:w-1/2"
              >
                Send Email
              </Button>
            <h2 className="text-gray-300 text-center lg:w-1/2 sm:w-full">
              Already have an account?
              <span> </span>
              <Link className="font-bold text-transparent bg-clip-text bg-gradient-to-t from-[#E1C49A] to-amber-200" to={"/signin"}>
                Sign in
              </Link>
            </h2>
            </form>
          </div>
        </div>

        <div className="mx-auto lg:w-1/2 sm:w-0 ">
          <img src="./LogoDashMasjid.png" width={550}
            height={550}
            className="mx-auto mt-[180px]" alt="" />
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswrod;
