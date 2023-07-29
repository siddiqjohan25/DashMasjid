import React, { useEffect, useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { app } from "../firebase";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, setDoc, doc, getDoc,getDocs,updateDoc } from "firebase/firestore";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Audio, FidgetSpinner, Watch } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Sidebar, SidebarItem } from "react-responsive-sidebar";
import { styled, makeStyles } from "@mui/material/styles";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import Modal from "./Modal";
import { async } from "@firebase/util";

const HomePage = () => {

  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [activeButton, setActiveButton] = useState(0);

  const [selectedMonth, setSelectedMonth] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [donationdata,setDonation]=useState(
    {
      "January":{"Week 1":0,"Week 2":0,"Week 3":0,"Week 4":0},
      "February":{"Week 1":0,"Week 2":0,"Week 3":0,"Week 4":0},
      "March":{"Week 1":0,"Week 2":0,"Week 3":0,"Week 4":0},
      "April":{"Week 1":0,"Week 2":0,"Week 3":0,"Week 4":0},
      "May":{"Week 1":0,"Week 2":0,"Week 3":0,"Week 4":0},
      "June":{"Week 1":0,"Week 2":0,"Week 3":0,"Week 4":0},
      "July":{"Week 1":0,"Week 2":0,"Week 3":0,"Week 4":0},
      "August":{"Week 1":0,"Week 2":0,"Week 3":0,"Week 4":0},
      "September":{"Week 1":0,"Week 2":0,"Week 3":0,"Week 4":0},
      "October":{"Week 1":0,"Week 2":0,"Week 3":0,"Week 4":0},
      "November":{"Week 1":0,"Week 2":0,"Week 3":0,"Week 4":0},
      "December":{"Week 1":0,"Week 2":0,"Week 3":0,"Week 4":0},
    }
  )
  const [dataset,setDataset]=useState(false)
  const location = useLocation();
  const db = getFirestore(app);
  const auth = getAuth(app);
  const user = auth.currentUser;

  
  const [lineGraphData,setLineGraphData]=useState([
    { name: "January", data1: 65, data2: 28 },
    { name: "February", data1: 59, data2: 48 },
    { name: "March", data1: 80, data2: 40 },
    { name: "April", data1: 81, data2: 19 },
    { name: "May", data1: 56, data2: 86 },
    { name: "June", data1: 55, data2: 27 },
    { name: "July", data1: 40, data2: 29 },
    { name: "August", data1: 55, data2: 60 },
    { name: "September", data1: 31, data2: 80 },
    { name: "October", data1: 48, data2: 79 },
    { name: "November", data1: 54, data2: 28 },
    { name: "December", data1: 44, data2: 56 },
    { name: "", data1: 0, data2: 0 },
  ])

  
  let obj={

  }
  const Months=[
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
  ]
  const Weeks=[
     "Week 1",
     "Week 2",
     "Week 3",
     "Week 4"
  ]
 
  
  useEffect(() => {
    const retrve=async()=>{
      const docRef = doc(db, user.email, "new");
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        setDonation(docSnap.data())
        setDataset(true)
        console.log(docSnap.data());
        
         
      }
       else {
        console.log("No such document!");
        const fc=async()=>{
          const docref = await setDoc(doc(db, user.email, "new"), donationdata);
          console.log("here", docref)
        }
        fc()
      }
     
    }
    
    retrve()
 
    

  }, [db,user,collection, addDoc, setDoc, doc, getDoc,getDocs,updateDoc,auth]);
  
   
  
  const lol=()=>{
    const lc=[
      { name: "Week 1", 
      January:donationdata["January"]["Week 1"],
      February:donationdata["February"]["Week 1"],
      March:donationdata["March"]["Week 1"],
      April:donationdata["April"]["Week 1"],
      May:donationdata["May"]["Week 1"],
      June:donationdata["June"]["Week 1"],
      July:donationdata["July"]["Week 1"],
      August:donationdata["August"]["Week 1"],
      September:donationdata["September"]["Week 1"],
      October:donationdata["October"]["Week 1"],
      November:donationdata["November"]["Week 1"],
      December:donationdata["December"]["Week 1"],
      },
      { name: "Week 2", 
      January:donationdata["January"]["Week 2"],
      February:donationdata["February"]["Week 2"],
      March:donationdata["March"]["Week 2"],
      April:donationdata["April"]["Week 2"],
      May:donationdata["May"]["Week 2"],
      June:donationdata["June"]["Week 2"],
      July:donationdata["July"]["Week 2"],
      August:donationdata["August"]["Week 2"],
      September:donationdata["September"]["Week 2"],
      October:donationdata["October"]["Week 2"],
      November:donationdata["November"]["Week 2"],
      December:donationdata["December"]["Week 2"],
      },
      { name: "Week 3", 
      January:donationdata["January"]["Week 3"],
      February:donationdata["February"]["Week 3"],
      March:donationdata["March"]["Week 3"],
      April:donationdata["April"]["Week 3"],
      May:donationdata["May"]["Week 3"],
      June:donationdata["June"]["Week 3"],
      July:donationdata["July"]["Week 3"],
      August:donationdata["August"]["Week 3"],
      September:donationdata["September"]["Week 3"],
      October:donationdata["October"]["Week 3"],
      November:donationdata["November"]["Week 3"],
      December:donationdata["December"]["Week 3"],
      },
      { name: "Week 4", 
      January:donationdata["January"]["Week 4"],
      February:donationdata["February"]["Week 4"],
      March:donationdata["March"]["Week 4"],
      April:donationdata["April"]["Week 4"],
      May:donationdata["May"]["Week 4"],
      June:donationdata["June"]["Week 4"],
      July:donationdata["July"]["Week 4"],
      August:donationdata["August"]["Week 4"],
      September:donationdata["September"]["Week 4"],
      October:donationdata["October"]["Week 4"],
      November:donationdata["November"]["Week 4"],
      December:donationdata["December"]["Week 4"],
      },
    ]
    setLineGraphData(lc)
    setDataset(true)
  }
  const lol2=()=>{
     const rc=[
      {
        "name":"January",
        total:parseInt(donationdata["January"]["Week 1"])+parseInt(donationdata["January"]["Week 2"])
        +parseInt(donationdata["January"]["Week 3"])+parseInt(donationdata["January"]["Week 4"])
      }, 
      {
        "name":"February",
        total:parseInt(donationdata["February"]["Week 1"])+parseInt(donationdata["February"]["Week 2"])
        +parseInt(donationdata["February"]["Week 3"])+parseInt(donationdata["February"]["Week 4"])
      }, 
      {
        "name":"March",
        total:parseInt(donationdata["March"]["Week 1"])+parseInt(donationdata["March"]["Week 2"])
        +parseInt(donationdata["March"]["Week 3"])+parseInt(donationdata["March"]["Week 4"])
      }, 
      {
        "name":"April",
        total:parseInt(donationdata["April"]["Week 1"])+parseInt(donationdata["April"]["Week 2"])
        +parseInt(donationdata["April"]["Week 3"])+parseInt(donationdata["April"]["Week 4"])
      }, 
      {
        "name":"May",
        total:parseInt(donationdata["May"]["Week 1"])+parseInt(donationdata["May"]["Week 2"])
        +parseInt(donationdata["May"]["Week 3"])+parseInt(donationdata["May"]["Week 4"])
      }, 
      {
        "name":"June",
        total:parseInt(donationdata["June"]["Week 1"])+parseInt(donationdata["June"]["Week 2"])
        +parseInt(donationdata["June"]["Week 3"])+parseInt(donationdata["June"]["Week 4"])
      },  {
        "name":"July",
        total:parseInt(donationdata["July"]["Week 1"])+parseInt(donationdata["July"]["Week 2"])
        +parseInt(donationdata["July"]["Week 3"])+parseInt(donationdata["July"]["Week 4"])
      },  {
        "name":"August",
        total:parseInt(donationdata["August"]["Week 1"])+parseInt(donationdata["August"]["Week 2"])
        +parseInt(donationdata["August"]["Week 3"])+parseInt(donationdata["August"]["Week 4"])
      },  {
        "name":"September",
        total:parseInt(donationdata["September"]["Week 1"])+parseInt(donationdata["September"]["Week 2"])
        +parseInt(donationdata["September"]["Week 3"])+parseInt(donationdata["September"]["Week 4"])
      },  {
        "name":"October",
        total:parseInt(donationdata["October"]["Week 1"])+parseInt(donationdata["October"]["Week 2"])
        +parseInt(donationdata["October"]["Week 3"])+parseInt(donationdata["October"]["Week 4"])
      },  {
        "name":"November",
        total:parseInt(donationdata["November"]["Week 1"])+parseInt(donationdata["November"]["Week 2"])
        +parseInt(donationdata["November"]["Week 3"])+parseInt(donationdata["November"]["Week 4"])
      },  {
        "name":"December",
        total:parseInt(donationdata["December"]["Week 1"])+parseInt(donationdata["December"]["Week 2"])
        +parseInt(donationdata["December"]["Week 3"])+parseInt(donationdata["December"]["Week 4"])
      }, 
     ]
     setLineGraphData(rc)
     setDataset(true)
  }
  
 
  const handleButtonClick = (buttonIndex) => {
    setActiveButton(buttonIndex);
    console.log(buttonIndex)
    if(buttonIndex==0){lol()}
    else{lol2()}
  };

  const handleOpenModal = (month) => {
    setIsModalOpen(true);
    setSelectedMonth(month);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMonth("");
  };

  const handleSubmitModal =async (selectedWeek, inputValue, e) => {
    console.log("Selected Week:", selectedWeek);
    console.log("Input Value:", inputValue);
    console.log(selectedMonth)
    let data=donationdata
    console.log(data)
    data[selectedMonth][selectedWeek]=inputValue
    console.log( data[selectedMonth][selectedWeek])
    setDonation(data)
    console.log("here",donationdata)
    
      const dc = doc(db, user.email, "new");
      const dp= await updateDoc(dc,donationdata);

    handleCloseModal();
  };

  const navigate = useNavigate();
  const signout = () => {
    signOut(auth);
    toast.error("Signed out");
    setTimeout(function () {
      navigate("/");
    }, 1800);
  };
  const handlechange=()=>{
    console.log("change")
  }
  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  //Graph 1
 

  //Graph 1

  //SIDEBAR
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
  //SIDEBAR

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

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#02062a] to-[#343857]">
      <Sidebar content={items} background="#232325" backdrop={true}>
        <Container
          maxWidth="lg"
          style={{ paddingTop: "4rem", paddingBottom: "4rem" }}
        >
          {/* Buttons Section */}
          <Grid item xs={12 } md={12} lg={12}>
          
            <Paper
              style={{
                padding: "2rem",
                display: "flex",
                overflow: "auto",
                flexDirection: "row",
                backgroundColor: "transparent",
                justifyContent: "center",
                width: "1400px",
                maxWidth: "1400px",
                marginLeft: "-130px",
                marginRight: "-100px",
                marginBottom: "1rem", // Add margin to create a gap
              }}
            >
              {/* Buttons */}
              {[
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
              ].map((month, index) => (
                <React.Fragment key={index}>
                  <Button
                    variant="contained"
                    color="primary"
                    className="sm:w-full font-extrabold tracking-widest text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 dark:focus:ring-blue-800  rounded-lg text-sm"
                    style={{ marginRight: "1rem", width: "120px" }}
                    onClick={() => handleOpenModal(month)}
                  >
                    {month}
                  </Button>
                  {isModalOpen && selectedMonth === month && (
                    <Modal
                      isOpen={isModalOpen}
                      onClose={handleCloseModal}
                      onSubmit={handleSubmitModal}
                      onChange={handlechange}
                      buttonName={selectedMonth}

                    />
                  )}
                </React.Fragment>
              ))}
            </Paper>
          </Grid>

          <Grid container spacing={2}>
          
            {/* Graph Section 1 */}
            <Grid item xs={12} md={12} lg={12}>
              <Paper
                style={{
                  padding: "2rem",
                  display: "flex",
                  overflow: "auto",
                  flexDirection: "column",
                  backgroundColor: "#27293D",
                  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
                  width: "100%",
                  marginTop: "2rem", // Add margin to create a gap
                  position: "relative", // Add position relative to the Paper component
                }}
              >
                {/* Buttons or Tabs */}
                <div
                  style={{
                    position: "absolute",
                    top: "1rem",
                    right: "1rem",
                    display: "flex",
                  }}
                >
                  <button
                    style={{
                      marginRight: "-1px",
                      padding: "0.5rem 1rem",
                      backgroundColor:
                        activeButton === 0 ? "#1a73e8" : "rgba(0, 0, 0, 0.3)",
                      border: "none",
                      borderTopLeftRadius: "4px",
                      borderBottomLeftRadius: "4px",
                      color: activeButton === 0 ? "#fff" : "#ccc",
                      fontSize: "12px",
                    }}
                    onClick={() => handleButtonClick(0)}
                  >
                    Weekly
                  </button>
                  <button
                    style={{
                      marginRight: "-1px",
                      padding: "0.5rem 1rem",
                      backgroundColor:
                        activeButton === 1 ? "#1a73e8" : "rgba(0, 0, 0, 0.3)",
                      border: "none",
                      color: activeButton === 1 ? "#fff" : "#ccc",
                      fontSize: "12px",
                    }}
                    onClick={() => handleButtonClick(1)}
                  >
                    Monthly
                  </button>
                  
                </div>

                {/* Graph 1 content */}
                <Typography
                  variant="h6"
                  gutterBottom
                  style={{
                    fontFamily: "Arial, sans-serif",
                    fontSize: "1.2rem",
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                    color: "#fff",
                    marginBottom: "1rem",
                  }}
                >
                  Donation Analysis
                </Typography>
                <LineChart width={1086} height={380} data={lineGraphData}>
                  {/* Chart components */}
                  <defs>
                    <filter
                      id="glow"
                      x="-50%"
                      y="-50%"
                      width="200%"
                      height="200%"
                    >
                      <feGaussianBlur
                        in="SourceGraphic"
                        stdDeviation="4"
                        result="glow"
                      />
                      <feMerge>
                        <feMergeNode in="glow" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "none",
                      borderRadius: "4px",
                      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                      color: "#333",
                      fontSize: "12px",
                    }}
                  />
                  <Legend />
                 
                  <Line
                    type="monotone"
                    dataKey="January"
                    stroke="#1a73e8" // Adjust the line color
                    strokeWidth={2} // Adjust the line thickness
                    filter="url(#glow)" // Apply the glow effect
                  />
                  <Line
                  type="monotone"
                  dataKey="total"
                  stroke="#1a73e8" // Adjust the line color
                  strokeWidth={2} // Adjust the line thickness
                  filter="url(#glow)" // Apply the glow effect
                />
                 
                  <Line
                  type="monotone"
                  dataKey="February"
                  stroke="#e53935" // Adjust the line color
                  strokeWidth={2} // Adjust the line thickness
                  filter="url(#glow)" // Apply the glow effect
                 />
                 <Line
                  type="monotone"
                  dataKey="March"
                  stroke="#07e642" // Adjust the line color
                  strokeWidth={2} // Adjust the line thickness
                  filter="url(#glow)" // Apply the glow effect
                 />
                    <Line
                  type="monotone"
                  dataKey="April"
                  stroke="#02e452" // Adjust the line color
                  strokeWidth={2} // Adjust the line thickness
                  filter="url(#glow)" // Apply the glow effect
                 />
                 <Line
                  type="monotone"
                  dataKey="May"
                  stroke="#b8cf0e" // Adjust the line color
                  strokeWidth={2} // Adjust the line thickness
                  filter="url(#glow)" // Apply the glow effect
                 />
                 <Line
                  type="monotone"
                  dataKey="June"
                  stroke="#c406ae" // Adjust the line color
                  strokeWidth={2} // Adjust the line thickness
                  filter="url(#glow)" // Apply the glow effect
                 />
                 <Line
                  type="monotone"
                  dataKey="July"
                  stroke="#fa7e02" // Adjust the line color
                  strokeWidth={2} // Adjust the line thickness
                  filter="url(#glow)" // Apply the glow effect
                 />
                 <Line
                  type="monotone"
                  dataKey="August"
                  stroke="#b8fa02" // Adjust the line color
                  strokeWidth={2} // Adjust the line thickness
                  filter="url(#glow)" // Apply the glow effect
                 />
                
                 <Line
                  type="monotone"
                  dataKey="September"
                  stroke="#7869ff" // Adjust the line color
                  strokeWidth={2} // Adjust the line thickness
                  filter="url(#glow)" // Apply the glow effect
                 />
                 <Line
                 type="monotone"
                 dataKey="October"
                 stroke="#f8f7fa" // Adjust the line color
                 strokeWidth={2} // Adjust the line thickness
                 filter="url(#glow)" // Apply the glow effect
                 />
                 <Line
                  type="monotone"
                  dataKey="November"
                  stroke="#9feddc" // Adjust the line color
                  strokeWidth={2} // Adjust the line thickness
                  filter="url(#glow)" // Apply the glow effect
                 />
                 <Line
                  type="Data"
                  dataKey="December"
                  stroke="#ed7295" // Adjust the line color
                  strokeWidth={2} // Adjust the line thickness
                  filter="url(#glow)" // Apply the glow effect
                 />

                </LineChart>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Sidebar>
    </div>
  );
};

export default HomePage;
