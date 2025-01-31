import "./App.css";
import AllTask from "./pages/AllTask";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Important from "./pages/Important";
import Completed from "./pages/Completed";
import Incomplete from "./pages/Incomplete";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import { UserContextProvider } from "./context/userContext";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

axios.defaults.baseURL = "http://localhost:8000/api";
axios.defaults.withCredentials = true;

// Add an interceptor to include the token in every request
axios.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;

      // Attach token and userId to headers
      config.headers.Authorization = `Bearer ${token}`;
      config.headers._id = userId;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

function App() {
  return (
    <UserContextProvider className="h-screen p-2 relative">
      <Toaster position="top-center" toastOptions={{ duration: 2000 }} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<AllTask />} />
            <Route path="/important" element={<Important />} />
            <Route path="/completed" element={<Completed />} />
            <Route path="/incomplete" element={<Incomplete />} />
          </Route>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
