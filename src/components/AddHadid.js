import React, { useState, useEffect } from "react";
import { Sidebar, SidebarItem } from "react-responsive-sidebar";
import { Link } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { app } from "../firebase";
import { getFirestore, setDoc, addDoc } from "firebase/firestore";
import { Audio, FidgetSpinner, Watch } from "react-loader-spinner";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { data } from "autoprefixer";
import { useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getDownloadURL,
  getStorage,
  ref as storageRef,
  uploadBytesResumable,
} from "firebase/storage";
import {
  TextInput,
  Label,
  Checkbox,
  Button,
  Textarea,
  input,
} from "flowbite-react";
import { styled } from '@mui/material/styles';
import { ListItem,ListItemIcon,ListItemText } from "@mui/material";

const AddHadid = () => {
  const [loading, setLoading] = useState(true);

  const db = getFirestore(app);
  const auth = getAuth(app);
  const user = auth.currentUser;
  const navigate = useNavigate();
  const signout = () => {
    signOut(auth);
    toast.error("Signed out");
    setTimeout(function () {
      navigate("/");
    }, 1800);
  };
  const storage = getStorage(app);

  const location = useLocation();
  
  const [selectedItem, setSelectedItem] = useState(null);

  const SidebarItem = styled(ListItem)(({ theme, isActive }) => ({
    borderRadius: theme.spacing(1),
    marginBottom: theme.spacing(2), // Increase the margin to create a gap
    "&:hover": {
      backgroundColor: isActive ? null : "#5A5A5E",
      color: isActive ? null : "#333",
      transform: isActive ? "translateY(0)" : "translateY(-2px)", // Adjust the transform property conditionally
      boxShadow: isActive ? "0 4px 10px rgba(255, 255, 255, 0.5)" : "0 4px 10px rgba(0, 0, 0, 0.3)", // Add white shadow on hover for the selected item
    },
    backgroundColor: isActive ? "#6B46C1" : "transparent",
    color: isActive ? "#fff" : "#E1C49A",
    transform: "translateY(0)", // Adjust the initial transform property
    boxShadow: isActive ? "0 4px 10px rgba(0, 0, 0, 0.3)" : "none", // Add a higher box shadow
  }));
  
  const SidebarLink = styled(Link)(({ theme }) => ({
    color: "#E1C49A",
    display: "flex",
    alignItems: "center",
    width: "100%",
    padding: theme.spacing(1, 2), // Add padding to increase column spacing
    textDecoration: "none", // Add text decoration to remove underline
    background: "#232325", // Set the background color to #232325
  }));
  
  const SidebarListItemIcon = styled(ListItemIcon)(({ theme }) => ({
    color: "#E1C49A",
    minWidth: "auto",
    marginRight: theme.spacing(2.5),
  }));
  
  const SidebarListItemText = styled(ListItemText)(({ theme }) => ({
    color: "#E1C49A",
    marginLeft: theme.spacing(2), // Add margin to increase spacing
    fontFamily: "cursive", // Set the font family to a cursive font
    fontWeight: "bold", // Set the font weight to bold
  }));

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const items = [
    
    <SidebarLink to={"/"} onClick={() => handleItemClick('dashboard')}>
  <SidebarItem isActive={location.pathname === '/'}>
    <div className="flex items-center">
      <SidebarListItemIcon className="ml-3">
        <img
          src="./LogoDashMasjid.png"
          className="inline-block mt-[-5px] w-6 h-6"
          alt=""
        />
      </SidebarListItemIcon>
      </div>
      <SidebarListItemText primary="DASHBOARD" />
    
  </SidebarItem>
</SidebarLink>,

<SidebarLink to="/events" onClick={() => handleItemClick('events')}>
<SidebarItem isActive={location.pathname === '/events'}>
      
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class=" inline-block mt-[-5px] mx-4 w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
          />
        </svg>
        <SidebarListItemText primary="EVENTS" />
      
    </SidebarItem>
    </SidebarLink>,

<SidebarLink to={"/addevent"} onClick={() => handleItemClick('addevent')}>
<SidebarItem isActive={location.pathname === '/addevent'}>
  
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class=" inline-block mt-[-5px] mx-4 w-6 h-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
      />
    </svg>
    <SidebarListItemText primary="ADD EVENTS" />
  
</SidebarItem>
</SidebarLink>,
    
      <SidebarLink to={"/committeemembers"} onClick={() => handleItemClick('committeemembers')}>
      <SidebarItem isActive={location.pathname === '/committeemembers'}> 
       
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="inline-block mt-[-5px] mx-4 w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
          />
        </svg>
        <SidebarListItemText primary="COMMITTEE MEMBER" />
        </SidebarItem>
        </SidebarLink>
    ,
    
      <SidebarLink to={"/addcommitie"} onClick={() => handleItemClick('addcommitie')}>
      <SidebarItem isActive={location.pathname === '/addcommitie'}> 
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="inline-block mt-[-5px] mx-4 w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
          />
        </svg>
        <SidebarListItemText primary="ADD MEMBER" /> 
        </SidebarItem>
      </SidebarLink>
    ,
   
      <SidebarLink to={"/hadid"} onClick={() => handleItemClick('hadid')}>
      <SidebarItem isActive={location.pathname === '/hadid'}> 
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="inline-block mt-[-5px] mx-4 w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
          />
        </svg>
        <SidebarListItemText primary="HADITH" />
        </SidebarItem>
      </SidebarLink>
   ,
    
      <SidebarLink to={"/addhadid"} onClick={() => handleItemClick('addhadid')}>
      <SidebarItem isActive={location.pathname === '/addhadid'}> 
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="inline-block mt-[-5px] mx-4 w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
          />
        </svg>
        <SidebarListItemText primary="ADD HADITH" />
        </SidebarItem>
      </SidebarLink>
    ,
    <SidebarLink>
    <SidebarItem onClick={signout}>
      <button className="flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="inline-block mt-[-5px] mx-4 w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
          />
        </svg>
        <SidebarListItemText primary="LOGOUT" />
      </button>
    </SidebarItem>
  </SidebarLink>
   ,
  ]; 

  useEffect(() => {}, []);
  const [hadid, sethadid] = useState("");
  const [load, setload] = useState(true);
  const [file, setfile] = useState(null);

  const changehadid = (e) => {
    sethadid(e.target.value);
    setload(!load);
  };
  const submithadid = async () => {
    try {
      let docRef;
      if (file) {
        const fileRef = storageRef(
          storage,
          `/files/${user.email + file.name + Math.random() * 10000}`
        );
        const uploadTask = uploadBytesResumable(fileRef, file);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {},
          async () => {
            await getDownloadURL(uploadTask.snapshot.ref).then((url) => {
              docRef = addDoc(collection(db, user.email), {
                hadid: hadid,
                image: url,
                type: "hadid",
              });
            });
          }
          
        );
        console.log("Document written with ID: ", docRef.id);
        if (docRef.id != null) {
        }
      } else {
        docRef = await addDoc(collection(db, user.email), {
          hadid: hadid,
          type: "hadid",
        });
        
        console.log("Document written with ID: ", docRef.id);
        if (docRef.id != null) {
        }
      }
    } 
    
    catch (e) {
      console.error("Error adding document: ", e);
    }
    toast.success("Hadith Added !");
    setTimeout(function () {
      navigate("/hadid");
    }, 1800);
    
  };

  return (
    <div className="bg-gradient-to-r from-[#02062a] to-[#343857] text-[#E1C49A] min-h-screen  ">
      <Sidebar content={items} background="#232325" backdrop={true}>
        <div className="flex justify-center items-center h-screen w-full">
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
            
          <div className="w-1/2  p-2 m-2">
            <h1 className=" mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl text-[#E1C49A] text-center my-5 font-extrabold text-transparent bg-clip-text bg-gradient-to-t from-[#E1C49A] to-amber-200">
              ADD HADITH
            </h1>
            &nbsp;
            <div className="flex flex-col mb-4 text-black">
              <Label
                htmlFor="first_name"
                value="Details of Hadith"
                className="block mb-2 text-sm text-[17px] text-gray-900 text-white"
              />
              
              <textarea
                value={hadid}
                onChange={changehadid}
                rows="4"
                type="text"
                name="last_name"
                id="last_name"
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Write hadith description here..."
              ></textarea>
              </div>
              
              <div className="flex flex-col mb-4 text-black">
              <Label
                htmlFor="image"
                value="Upload Image"
                className="block mb-2 text-sm text-[17px] text-gray-900 text-white"
              />
            
              
              <input
                class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                aria-describedby="file_input_help"
                name="image"
                id="image"
                type="file"
                onChange={(e) => {
                  setfile(e.target.files[0]);
                }}
              ></input>
              <p
                class="mt-1 text-sm text-gray-500 dark:text-gray-300"
                id="file_input_help"
              >
                SVG, PNG, JPG or GIF.
              </p>{" "}
              {/* <input
                type="file"
                name="image"
                id="image"
                className="mr-auto mt-5"
                onChange={(e) => {
                  setfile(e.target.files[0]);
                }}
              /> */}
            </div>
              
          

          <button
            onClick={submithadid}
            // className="sm:w-full my-4 py-2 bg-black backdrop-blur-2xl bg-opacity-30 border-[1px] rounded-xl"
            className="sm:w-full my-6 py-3 tracking-widest font-bold text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 dark:focus:ring-blue-800  rounded-lg text-sm"
          >
            ADD HADITH
          </button>
          </div>
        </div>
      </Sidebar>
    </div>
  );
};

export default AddHadid;
