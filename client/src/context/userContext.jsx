import axios from "axios";
import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export const UserContext = createContext();

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!user) {
      const token = Cookies.get("token");
      if (token) {
        console.log(token);
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.userId;
        console.log("User ID:", userId);
        axios
          .get("/v1/profile", {
            headers: {
              Authorization: `Bearer ${token}`,
              _id: userId,
            },
          })
          .then(({ data }) => {
            setUser(data);
            setLoading(false);
          })
          .catch((error) => {
            console.error("An error occurred:", error.message);
            setLoading(false);
          });
      } else {
        setLoading(false); // No token, set loading to false
      }
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
}
