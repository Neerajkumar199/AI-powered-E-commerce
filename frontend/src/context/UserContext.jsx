// UserContext.jsx
import React, {
  createContext,
  useState,
  useEffect,
  useContext
} from "react";
import axios from "axios";
import { authDataContext } from "./authContext";

export const userDataContext = createContext();

function UserContext({ children }) {
  const [userData, setUserData] = useState(null);
  const { serverUrl } = useContext(authDataContext);

  const getCurrentUser = async () => {
    try {
      const result = await axios.post(
        `${serverUrl}/api/user/getcurrentuser`,
        {},
        { withCredentials: true } // ✅ Send cookies/session token
      );

      setUserData(result.data);
      console.log("Current user:", result.data);
    } catch (error) {
      setUserData(null);
      console.error("getCurrentUser error:", error);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  const value = {
    userData,
    setUserData,
    getCurrentUser
  };

  return (
    <userDataContext.Provider value={value}>
      {children}
    </userDataContext.Provider>
  );
}

export default UserContext;
