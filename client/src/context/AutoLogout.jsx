// SessionTimeout.js
import { useEffect, useContext } from "react";
import { AuthContext } from "../context/authContext";

const AutoLogout = () => {
  const { logout } = useContext(AuthContext);

  const checkSessionTimeout = () => {
    const lastActivityTimestamp = localStorage.getItem("lastActivityTimestamp");
    const sessionTimeout = 60 *60 * 1000; // 60 minutes in milliseconds

    if (lastActivityTimestamp && Date.now() - lastActivityTimestamp > sessionTimeout) {
      logout(); // Logout the user if the session has expired
    }

    if(!lastActivityTimestamp){
      logout();
    }

  };

  const updateLastActivityTimestamp = () => {
    localStorage.setItem("lastActivityTimestamp", Date.now());
  };

  useEffect(() => {
    checkSessionTimeout();
    const interval = setInterval(checkSessionTimeout, 1000); // Check every second

    // Update the last activity timestamp on user activity
    document.addEventListener("mousemove", updateLastActivityTimestamp);
    document.addEventListener("keydown", updateLastActivityTimestamp);

    return () => {
      clearInterval(interval);
      document.removeEventListener("mousemove", updateLastActivityTimestamp);
      document.removeEventListener("keydown", updateLastActivityTimestamp);
    };
  }, [logout]);

  return null;
};

export default AutoLogout;