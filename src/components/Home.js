import React, { useEffect, useContext, useState } from "react";
import { AuthContext } from "./AuthContext";
import { getCurrentUser } from "../api/userService";

const HomePage = () => {


  return (
    <div >
      <h1>Welcome</h1> 
    </div>
  );
};

export default HomePage;
