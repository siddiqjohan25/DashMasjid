import React, { useState, useEffect } from "react";
import { Sidebar, SidebarItem } from "react-responsive-sidebar";
import { Link } from "react-router-dom";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { app } from "../firebase";
import { getFirestore } from "firebase/firestore";
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
  TextInput,
  Label,
  Checkbox,
  Button,
  Textarea,
  input,
  Card,
} from "flowbite-react";
import { styled } from "@mui/material/styles";
import { ListItem, ListItemIcon, ListItemText } from "@mui/material";

const Hadid = () => {
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

  const [image, setImage] = useState(null);
  const defaultImage = "./noimage.jpg";

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
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

  const [hadiddata, setHadiddata] = useState([]);

  useEffect(() => {
    const getevents = async () => {
      const db = await getFirestore(app);
      const auth = await getAuth(app);

      onAuthStateChanged(auth, (user) => {
        if (user) {
          const retdata = async () => {
            const user = await auth.currentUser;
            const eventss = await collection(db, user.email);
            const data = await getDocs(eventss);
            data.forEach((doc) => {
              setHadiddata(
                data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
              );
            });
            setLoading(false);
          };
          retdata();
        }
      });
    };
    getevents();
  }, []);

  return (
    <div className="bg-gradient-to-r from-[#02062a] to-[#343857]  text-[#E1C49A] min-h-screen">
      <Sidebar content={items} background="#232325" backdrop={true}>
        {loading ? (
          <div className="flex flex-col justify-center items-center my-auto h-full">
            <Watch
              height="80"
              width="80"
              radius="48"
              color="#ffffff"
              ariaLabel="watch-loading"
              wrapperStyle={{}}
              wrapperClassName=""
              visible={true}
            />
          </div>
        ) : (
          <div className="flex gap-8 flex-wrap justify-center ">
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
            {hadiddata.map((item, index) => {
              if (item?.type == "hadid") {
                return (
                  <div
                    className=" max-w-sm transform hover:scale-105 transition-transform"
                    style={{ width: "500px", padding: "20px" }}
                    key={index}
                  >
                    <div
                      className="bg-[#02062a] rounded-3xl overflow-hidden"
                      style={{ width: "100%", height: "100%" }}
                    >
                      <div
                        className="bg-gray-500 rounded-3xl p-4"
                        style={{ border: "30px" }}
                      >
                        <Card
                          onChange={handleImageChange}
                          style={{ backgroundColor: "#02062a", border: "30px" }}
                        >
                          {item.image ? (
                            <img
                              src={item.image}
                              alt="Uploaded Image"
                              style={{
                                width: "100%",
                                height: "200px",
                                objectFit: "cover",
                                borderTopLeftRadius: "20px",
                                borderTopRightRadius: "20px",

                                boxShadow:
                                  "0px 0px 3px 3px rgba(107, 114, 128, 1)",
                              }}
                            />
                          ) : (
                            <img
                              src={defaultImage}
                              alt="Default Image"
                              style={{
                                width: "100%",
                                height: "200px",
                                objectFit: "cover",
                                borderTopLeftRadius: "20px",
                                borderTopRightRadius: "20px",
                                filter: "brightness(80%) saturate(120%)",
                                boxShadow:
                                  "0px 0px 3px 3px rgba(107, 114, 128, 1)",
                              }}
                            />
                          )}
                          <div className="p-4">
                            <p
                              className="text-center text-sm text-[#cfc7c6] dark:text-gray-400 mt-2 overflow-hidden whitespace-nowrap overflow-ellipsis"
                              style={{ maxHeight: "1.5em" }}
                            >
                              {item.hadid}
                            </p>
                          </div>

                          <Link to={`/updatehadid?type=hadid&&id=${item.id}`}>
                            <Button
                              href="#"
                              className="sm:w-full font-extrabold tracking-widest text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 dark:focus:ring-blue-800  rounded-lg text-sm"
                              style={{ justifyContent: "center" }}>
                              UPDATE
                            </Button>
                          </Link>
                        </Card>
                      </div>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        )}
      </Sidebar>
    </div>
  );
};

export default Hadid;
