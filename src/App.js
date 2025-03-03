import './App.css';  
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import VerifyUser from "./components/VerifyUser";
import Login from "./components/Login";
import GetAllUsers from "./components/GetAllUsers";
import Home from './components/Home';
import { AuthProvider } from './components/AuthContext';
import Navbar from './NavBar';
import UpdateUser from './components/UpdateUser';
import { deleteUser } from './api/userService';
import UserDetails from './components/UsersDetails';
import ForgetPassword from './components/ForgetPassword';
import ResetPassword from './components/ResetPassword';

function App() {
  const [userEmail, setUserEmail] = useState(""); 
  const handleDelete=async(id)=>{
    try {
        await deleteUser(id)
    } catch (error) {
        throw error
    }
}
  return ( <div>
    <AuthProvider>
      <Navbar/>
      <Routes>
        <Route path="/home" element={<Home/>} />
        <Route path="/users" element={<GetAllUsers onDelete={deleteUser}/>} />
        <Route path="users/updateUser/:userId" element={<UpdateUser />} />
        <Route path="/register" element={<Register setUserEmail={setUserEmail} />}/>
        <Route path="/login" element={<Login />} />
        <Route path="/verify" element={<VerifyUser email={userEmail} />} />
        <Route path="/users/details/:userId" element={<UserDetails />} />    
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/resetpassword/:token" element={<ResetPassword />} />
            </Routes>
      </AuthProvider>
      </div>
  );
}

export default App;