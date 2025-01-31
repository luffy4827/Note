import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { UserContext } from "../context/userContext";

const Signup = () => {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  if (user) {
    navigate("/");
  }

  const registerUser = async (e) => {
    e.preventDefault();
    // console.log(data)
    try {
      const response = await axios.post("/v1/signup", data);
      toast.success("User registered successfully!");
      console.log("Success:", response.data);
      navigate("/login");
    } catch (error) {
      // Handle error response
      if (error.response && error.response.data) {
        toast.error(error.response.data.message || "Registration failed.");
        console.error("Error:", error.response.data);
      } else {
        toast.error("An unexpected error occurred.");
        console.error("Error:", error);
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-4 w-2/6 rounded-lg bg-gray-800">
        <div className="text-xl font-bold">SignUp</div>
        <form onSubmit={registerUser}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="bg-gray-700 px-3 py-2 my-3 w-full placeholder:font-bold"
            required
            value={data.username}
            onChange={(e) => setData({ ...data, username: e.target.value })}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="bg-gray-700 px-3 py-2 my-3 w-full placeholder:font-bold"
            required
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="bg-gray-700 px-3 py-2 my-3 w-full placeholder:font-bold"
            required
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
          <button
            type="submit"
            className="px-3 py-2 bg-sky-500 rounded-lg font-semibold"
          >
            SignUp
          </button>
        </form>
        <p className="my-2">
          Already have an account?{" "}
          <span className="text-sky-500">
            <Link to="/login" className="cursor-pointer">
              Login
            </Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
