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
import Settings from './components/Settings';
import UpdateInfo from './components/UpdateInfo';
import UpdatePassword from './components/UpdatePassword';

function App() {
  const [userEmail, setUserEmail] = useState(""); 

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/register" element={<Register setUserEmail={setUserEmail} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify" element={<VerifyUser email={userEmail} />} />
{/* protected routes  */}
<Route path="/home" element={<Home />} />
<Route path="/users" element={<GetAllUsers onDelete={handleDelete} />} />
<Route path="/users/updateUser/:userId" element={<UpdateUser />} />
<Route path="/users/details/:userId" element={<UserDetails />} />    
<Route path="/forgetpassword" element={<ForgetPassword />} />
<Route path="/resetpassword/:token" element={<ResetPassword />} />
<Route path="/settings" element={<Settings />} />
<Route path="/updateInfo" element={<UpdateInfo />} />
<Route path="/changePassword" element={<UpdatePassword />} />

        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
