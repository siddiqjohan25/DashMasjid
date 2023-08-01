import React, { useEffect, useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "../firebase";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { setDoc, doc, addDoc, collection } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TextInput, Label, Checkbox, Button } from "flowbite-react";

const SignUp = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState(null);
  const [masjidname, setMasjidName] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmpassword, setConfirmPassword] = useState(null);
  const [load, setLoad] = useState(true);
  const [username, setUsername] = useState(null);
  const [region, setRegion] = useState("gombak");
  const [states,setStates]=useState([])
  const [selectedstate,setSelectedState]=useState("johor");
  const [regions,setRegions]=useState([])
  const [showregions,setShowRegions]=useState([])
  const auth = getAuth(app);

  const signup = () => {
    if (password === confirmpassword) {
      const e = email;
      const p = password;
      createUserWithEmailAndPassword(auth, e, p)
        .then((userCredential) => {
          const user = userCredential.user;
          user.displayName = masjidname;
          const db = getFirestore(app);
          const storage = getStorage(app);
          const setuser = async () => {
            const db = getFirestore(app);
            let docRef = await addDoc(collection(db, "Users"), {
              email: user.email,
              MasjidName: masjidname,
              Username: username,
              state:selectedstate,
              region: region,
            });
          };
          setuser();
          toast.success("Mosque Registered !");
          setTimeout(function () {
            navigate("/");
          }, 1800);
        })
        .catch((error) => {
          toast.error("Please fill in all forms");
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    }
  };
  const changeconfirmpassword = (e) => {
    setConfirmPassword(e.target.value);
    setLoad(!load);
  };
  const changeemail = (e) => {
    setEmail(e.target.value);
    setLoad(!load);
  };
  const changemasjidname = (e) => {
    setMasjidName(e.target.value);
    setLoad(!load);
  };
  const changepassword = (e) => {
    setPassword(e.target.value);
    setLoad(!load);
  };
  const changeusername = (e) => {
    setUsername(e.target.value);
    setLoad(!load);
  };
  const changeregion = (e) => {
    setRegion(e.target.value);
    setLoad(!load);
  };
  const changestate=(e)=>{
         setSelectedState(states[e.target.value])
         setShowRegions(regions[e.target.value])
  }



  useEffect(()=>{
    
    axios.get("https://waktu-solat-api.herokuapp.com/api/v1/prayer_times.json")
    .then(function (response) {
      console.log(response.data.data.negeri)
      var nameArray = response.data.data.negeri.map(function (el) { return el.nama; });
      var regions = response.data.data.negeri.map(function (el) { return el.zon; });
      setStates(nameArray)
      setRegions(regions)
      setShowRegions(regions[0])
    })
    .catch(function (error) { console.log(error); })
    .finally(function () { });

  },[])
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
          <div className="justify-center text-white mt-12">
            <h1 className="text-3xl font-bold">
              Welcome, to{" "}
              <span class="font-bold text-transparent bg-clip-text bg-gradient-to-t from-[#E1C49A] to-amber-200">
                DashMasjid.
              </span>
            </h1>

            <h1 className="my-2 mb-10 mt-3">
              Please enter your details
            </h1>
            <form className=" flex-col gap-2">
              {/* USERNAME */}
              <div className="mb-2 block">
                <Label
                  htmlFor="email"
                  value="Your Username"
                  className="text-white font-bold"
                />
              </div>

              <TextInput
                id="text"
                type="text"
                sizing="md"
                onChange={changeusername}
                value={username}
                placeholder="Username"
                className="sm:w-full my-3 lg:w-1/2"
                required={true}
              />

              {/* <label htmlFor="email" className="text-[10px] font-bold">
				USERNAME
			  </label>
			  <input
				type="text"
				name="username"
				onChange={changeusername}
				value={username}
				placeholder="Username"
				className="text-black block my-3 sm:w-full lg:w-1/2 rounded-3xl px-3 py-2 bg-gray-200 border-none"
				id=""
			  /> */}

              {/* MASJIDNAME */}

              <Label
                htmlFor="mosquename"
                value="Mosque's Name"
                className="text-white font-bold"
              />

              <TextInput
                id="mosquename"
                type="text"
                sizing="md"
                onChange={changemasjidname}
                value={masjidname}
                placeholder="Mosque's name"
                className="sm:w-full my-3 lg:w-1/2"
                required={true}
              />

              {/* <label htmlFor="email" className="text-[10px] font-bold">
              MASJIDNAME
            </label>
            <input
              type="email"
              name="email"
              onChange={changemasjidname}
              value={masjidname}
              placeholder="Masjid name"
              className="text-black block my-3 sm:w-full lg:w-1/2 rounded-3xl px-3 py-2 bg-gray-200 border-none"
              id=""
            /> */}

              {/* EMAIL */}

              <Label
                htmlFor="email"
                value="Your Email"
                className="text-white font-bold"
              />

              <TextInput
                id="email"
                type="email"
                sizing="md"
                onChange={changeemail}
                value={email}
                placeholder="dashmasjid@gmail.com"
                className="sm:w-full my-3 lg:w-1/2"
                required={true}
              />

              {/* <label htmlFor="email" className="text-[10px] font-bold">
              EMAIL
            </label>
            <input
              type="email"
              name="email"
              onChange={changeemail}
              value={email}
              placeholder="dashmasjid@gmail.com"
              className="text-black block my-3 sm:w-full lg:w-1/2 rounded-3xl px-3 py-2 bg-gray-200 border-none"
              id=""
            /> */}
              {/* State */}

              <Label
                htmlFor="state"
                value="State"
                className="text-white font-bold"
              />
              <select required={true}
                onChange={(e)=>{changestate(e)}}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 sm:w-full my-3 lg:w-1/2"

              >
              {
                states.map((item,index)=>{
                  return(
                    index==0?<option value={index} selected>{item}</option>: <option value={index}>{item}</option>
                  )
                })
              }
              </select>

              {/* REGION */}

              <Label
                htmlFor="region"
                value="Region"
                className="text-white font-bold"
              />
              <select required={true}
                onChange={changeregion}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 sm:w-full my-3 lg:w-1/2"

              >
              {
                showregions.map((item,index)=>{

                  return(
                    index==0?<option value={item.nama} selected>{item.nama}</option>: <option value={item.nama}>{item.nama}</option>
                  )
                })
              }
             
              </select>

              {/* PASSWORD */}

              <Label
                htmlFor="password"
                value="Your password"
                className="text-white font-bold"
              />
              <TextInput
                id="password"
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
            </label>
            <input
              type="password"
              name="password"
              onChange={changepassword}
              value={password}
              placeholder="Password"
              className="text-black block my-3 sm:w-full lg:w-1/2 rounded-3xl px-3 py-2 bg-gray-200 border-none"
              id=""
            /> */}

              {/* COMFIRMPASSWORD */}
              <Label
                htmlFor="compassword"
                value="Comfirm password"
                className="text-white font-bold"
              />
              <TextInput
                id="password"
                name="password"
                type="password"
                onChange={changeconfirmpassword}
                value={confirmpassword}
                placeholder="Comfirm Password"
                required={true}
                className="sm:w-full my-3 lg:w-1/2"
              />
            </form>

            {/* <label htmlFor="email" className="text-[10px] font-bold">
              CONFIRMPASSWORD
            </label>
            <input
              type="password"
              name="password"
              onChange={changeconfirmpassword}
              value={confirmpassword}
              placeholder="Confrim Password"
              className="text-black block my-3 sm:w-full lg:w-1/2 rounded-3xl px-3 py-2 bg-gray-200 border-none"
              id=""
            /> */}

            {/* BUTTON */}
            &nbsp;
            <Button
              onClick={signup}
              className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 dark:focus:ring-blue-800 font-medium rounded-lg text-sm sm:w-full my-3 lg:w-1/2"

            >
              Sign up
            </Button>
            <h2 className="text-gray-300 text-center lg:w-1/2 sm:w-full">
              Already have an account?
              <span> </span>
              <Link className="font-bold text-transparent bg-clip-text bg-gradient-to-t from-[#E1C49A] to-amber-200" to={"/signin"}>
                Sign in
              </Link>
            </h2>

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

export default SignUp;
