import axios from "axios";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

const Login = () => {
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  if (user) {
    navigate("/");
  }

  const [loading, setLoading] = useState(false);

  const loginUser = async (e) => {
    e.preventDefault();
    console.log(data);
    setLoading(true);
    try {
      const response = await axios.post("/v1/login", data);
      toast.success("User login successfully!");
      console.log(response.data);
      setLoading(false);
      navigate("/");
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
        console.log("Error:", error.response.data);
      } else {
        toast.error("An unexpected error occurred.");
        console.log("Error:", error);
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-4 w-2/6 rounded-lg bg-gray-800">
        <div className="text-xl font-bold">Login</div>
        <form onSubmit={loginUser}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="bg-gray-700 px-3 py-2 my-3 w-full placeholder:font-bold"
            required
            value={data.username}
            onChange={(e) => {
              setData({ ...data, username: e.target.value });
            }}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="bg-gray-700 px-3 py-2 my-3 w-full placeholder:font-bold"
            required
            value={data.password}
            onChange={(e) => {
              setData({ ...data, password: e.target.value });
            }}
          />
          <button
            type="submit"
            className="px-3 py-2 bg-sky-500 rounded-lg font-semibold"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>
        <p className="my-2">
          Don't have an account?{" "}
          <span className="text-sky-500">
            <Link to="/signup" className="cursor-pointer">
              SignUp
            </Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
