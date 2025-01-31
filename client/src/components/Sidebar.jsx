import React, { useContext } from "react";
import { CgNotes } from "react-icons/cg";
import { MdImportantDevices } from "react-icons/md";
import { FaCheckSquare } from "react-icons/fa";
import { TbNotebookOff } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import Cookies from "js-cookie";

const Sidebar = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null); // Clear user data from context
    Cookies.remove("token"); // Remove token from cookies (or replace 'token' with your cookie name)
    navigate("/login"); // Redirect to login page
  };

  const title = [
    { title: "All Task", icons: <CgNotes />, link: "/" },
    { title: "Important", icons: <MdImportantDevices />, link: "/important" },
    { title: "Completed Task", icons: <FaCheckSquare />, link: "/completed" },
    { title: "Incomplete Task", icons: <TbNotebookOff />, link: "incomplete" },
  ];

  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        <h1 className="text-xl font-semibold">Note Manager</h1>
        <p>For Easy Notes</p>
        <hr className="border-2 border-gray-400" />
      </div>

      <div>
        {title.map((items, i) => (
          <Link
            to={items.link}
            key={i}
            className="my-2 font-bold flex items-center gap-3 hover:font-extrabold transition-all duration-300 cursor-pointer"
          >
            {" "}
            {items.icons} {items.title}{" "}
          </Link>
        ))}
      </div>

      <div>
        {user && (
          <div className="mb-2">
            <h1 className="text-lg font-semibold capitalize">
              {user.username}
            </h1>
            <p>{user.email}</p>
          </div>
        )}

        <button
          onClick={handleLogout}
          className="bg-gray-500 p-2 rounded-xl font-semibold w-full"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
