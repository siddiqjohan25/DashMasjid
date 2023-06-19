import React, { useState, useEffect } from "react";
import { Sidebar, SidebarItem } from "react-responsive-sidebar";
import { Link } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { app } from "../firebase";
import { getFirestore } from "firebase/firestore";
import { Audio, FidgetSpinner, Watch } from "react-loader-spinner";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  getDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import { data } from "autoprefixer";
import { useNavigate, useLocation } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { styled } from "@mui/material/styles";
import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import {
  TextInput,
  Label,
  Checkbox,
  Button,
  Textarea,
  input,
  Select,
  Option,
} from "flowbite-react";

const Updatemember = () => {
  const [loading, setLoading] = useState(true);
  const [searchparams, setSearchParms] = useSearchParams();
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

  const location = useLocation();

  const [selectedItem, setSelectedItem] = useState(null);

  const SidebarItem = styled(ListItem)(({ theme, isActive }) => ({
    borderRadius: theme.spacing(1),
    marginBottom: theme.spacing(2), // Increase the margin to create a gap
    "&:hover": {
      backgroundColor: isActive ? null : "#5A5A5E",
      color: isActive ? null : "#333",
      transform: isActive ? "translateY(0)" : "translateY(-2px)", // Adjust the transform property conditionally
      boxShadow: isActive
        ? "0 4px 10px rgba(255, 255, 255, 0.5)"
        : "0 4px 10px rgba(0, 0, 0, 0.3)", // Add white shadow on hover for the selected item
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
    <SidebarLink to={"/"} onClick={() => handleItemClick("dashboard")}>
      <SidebarItem isActive={location.pathname === "/"}>
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

    <SidebarLink to="/events" onClick={() => handleItemClick("events")}>
      <SidebarItem isActive={location.pathname === "/events"}>
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

    <SidebarLink to={"/addevent"} onClick={() => handleItemClick("addevent")}>
      <SidebarItem isActive={location.pathname === "/addevent"}>
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

    <SidebarLink
      to={"/committeemembers"}
      onClick={() => handleItemClick("committeemembers")}
    >
      <SidebarItem isActive={location.pathname === "/committeemembers"}>
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
    </SidebarLink>,
    <SidebarLink
      to={"/addcommitie"}
      onClick={() => handleItemClick("addcommitie")}
    >
      <SidebarItem isActive={location.pathname === "/addcommitie"}>
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
    </SidebarLink>,
    <SidebarLink to={"/hadid"} onClick={() => handleItemClick("hadid")}>
      <SidebarItem isActive={location.pathname === "/hadid"}>
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
    </SidebarLink>,
    <SidebarLink to={"/addhadid"} onClick={() => handleItemClick("addhadid")}>
      <SidebarItem isActive={location.pathname === "/addhadid"}>
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
    </SidebarLink>,
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
    </SidebarLink>,
  ];

  const [name, setName] = useState(null);
  const [day, setDay] = useState(null);
  const [memberposition, setPosition] = useState(null);
  const [load, setLoad] = useState(true);
  const changeName = (e) => {
    setName(e.target.value);
    setLoad(!load);
  };

  const changeDay = (e) => {
    setDay(e.target.value);
    setLoad(!load);
  };
  const changeposition = (e) => {
    setPosition(e.target.value);
    setLoad(!load);
  };
  useEffect(() => {
    const getdocument = async () => {
      const db = await getFirestore(app);
      const auth = await getAuth(app);
      const user = await auth.currentUser;
      const docRef = doc(db, user.email, searchparams.get("id"));
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setName(docSnap.data().name);
        setDay(docSnap.data().day);
        setPosition(docSnap.data().position);
        setLoading(false);
      } else {
        console.log("No such document!");
        setLoading(false);
      }
    };
    getdocument();
    console.log(name, day, memberposition);
  }, []);

  const upadateform = () => {
    setDoc(doc(db, user.email, searchparams.get("id")), {
      name: name,
      day: day,
      position: memberposition,
      type: "member",
    });
    toast.success("Member Updated !");
    setTimeout(function () {
      navigate("/committeemembers");
    }, 1800);
  };
  return (
    <div className="min-h-screen bg-gradient-to-r from-[#02062a] to-[#343857]">
      <Sidebar
        content={items}
        background="#232325"
        className=""
        backdrop={true}
      >
        <div className="flex justify-center items-center h-screen w-full ">
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
              UPDATE MEMBER
            </h1>
            &nbsp;
            <div className="flex flex-col mb-4 text-black">
              <Label
                htmlFor="first_name"
                value="Name of Member"
                className="text-white font-extrabbold text-[17px]"
              />
              {/* <label
            className="text-[10px] font-bold text-[#E1C49A]"
            for="first_name"
          >
            Name of member
          </label> */}

              <TextInput
                id="first_name"
                name="Nameofmember"
                type="text"
                sizing="md"
                onChange={changeName}
                value={name}
                placeholder="Name of Member"
                className="sm:w-full my-3 lg:w-6/7"
                required={true}
              />
            </div>
            <div className="flex flex-col mb-4 text-black">
              <Label
                htmlFor="first_name"
                value="Day"
                className="text-white font-extrabbold text-[17px]"
              />

              <Select
                onChange={changeDay}
                value={day}
                id="day"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option selected>Choose a day</option>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
                <option value="Sunday">Sunday</option>
              </Select>
              {/* <TextInput
            id="first_name"
            name="positionofmember"
            type="text"
            sizing="md"
            onChange={changeposition}
            placeholder="[Day] - [Name]"
            className="sm:w-full my-3 lg:w-6/7"
            required={true}
          /> */}
            </div>
            <div className="flex flex-col mb-4 text-black">
              <Label
                htmlFor="first_name"
                value="Position"
                className="text-white font-extrabbold text-[17px]"
              />
              <Select
                onChange={changeposition}
                value={memberposition}
                id="position"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option selected>Choose a positon</option>
                <option value="Imam">Imam</option>
                <option value="Bilal">Bilal</option>
              </Select>
              {/* <TextInput
            id="first_name"
            name="positionofmember"
            type="text"
            sizing="md"
            onChange={changeposition}
            placeholder="[Day] - [Name]"
            className="sm:w-full my-3 lg:w-6/7"
            required={true}
          /> */}
            </div>
            <button
              onClick={upadateform}
              // className="sm:w-full my-4 py-2 bg-black backdrop-blur-2xl bg-opacity-30 border-[1px] rounded-xl"
              className="sm:w-full my-6 py-3 tracking-widest font-bold text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 dark:focus:ring-blue-800  rounded-lg text-sm"
              type="submit"
            >
              UPDATE MEMBER
            </button>
            <button
              onClick={async () => {
                const db = await getFirestore(app);
                const auth = await getAuth(app);
                const user = await auth.currentUser;

                await deleteDoc(doc(db, user.email, searchparams.get("id")));

                toast.error("Member Deleted !");
                setTimeout(function () {
                  navigate("/committeemembers");
                }, 1800);
              }}
              className="sm:w-full my-6 py-3 tracking-widest font-bold text-white bg-gradient-to-r from-rose-400 to-red-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-300 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 dark:focus:ring-red-800  rounded-lg text-sm"
            >
              DELETE
            </button>
          </div>
        </div>
      </Sidebar>
    </div>
  );
};

export default Updatemember;
