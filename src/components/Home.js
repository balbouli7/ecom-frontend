import React, { useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";
import { getCurrentUser } from "../api/userService";

const HomePage = () => {
  const { user, setUser, isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    const fetchUserData = async () => {
      if (isLoggedIn) {
        const token = localStorage.getItem("token");
        try {
          const userData = await getCurrentUser(token);
          if (userData) {
            setUser(userData);  
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, [isLoggedIn, setUser]);

  return (
    <div
    style={{
        display: "flex",
        justifyContent: "center", // Horizontally centers
        height: "100vh",          // Takes up the full height of the viewport
        textAlign: "center",      // Centers text inside the div
      }}

    >
      <h1>Welcome, {user?.fullName || "to our store"}!</h1> 
    </div>
  );
};

export default HomePage;
