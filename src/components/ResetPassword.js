import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { resetPassword } from "../api/userService";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const storedEmail = localStorage.getItem("resetEmail");
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      setError("Email not found. Please request a new reset link.");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    try {
      const response = await resetPassword(token, email, newPassword);
      setMessage(response.message);
      setError("");
      localStorage.removeItem("resetEmail");
      setTimeout(() => navigate("/login"), 3000);
    } catch (error) {
      setError("Error resetting password. Please try again.");
      setMessage("");
    }
  };

  return (
    <div
      style={{
        backgroundImage:
          'url(https://img.freepik.com/free-photo/interior-clothing-store-with-stylish-merchandise-racks-fashionable-brand-design-casual-wear-modern-boutique-empty-fashion-showroom-shopping-centre-with-elegant-merchandise_482257-65537.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        width: "100%",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 0,
        padding: 0,
        overflow: 'hidden',
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: "450px",
          width: "100%",
          margin: "20px",
          padding: "30px",
          borderRadius: "15px",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <h2 style={{ textAlign: "center", color: "wheat", fontSize: "28px", fontWeight: "700" }}>
          Reset Password
        </h2>
        {error && (
          <div style={{ color: "#721c24", backgroundColor: "#f8d7da", padding: "12px", borderRadius: "8px", textAlign: "center", fontSize: "14px", border: "1px solid #f5c6cb" }}>
            {error}
          </div>
        )}
        {message && (
          <div style={{ color: "#155724", backgroundColor: "#d4edda", padding: "12px", borderRadius: "8px", textAlign: "center", fontSize: "14px", border: "1px solid #c3e6cb" }}>
            {message}
          </div>
        )}
        <div>
          <label style={{ color: "wheat" }}>Email</label>
          <input type="email" value={email} disabled style={{ width: "100%", padding: "12px", borderRadius: "10px", border: "1px solid #ddd", backgroundColor: "rgba(255, 255, 255, 0.8)" }} />
        </div>
        <div style={{ position: "relative" }}>
          <label style={{ color: "wheat" }}>New Password</label>
          <input type={showPassword ? "text" : "password"} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required style={{ width: "100%", padding: "12px", borderRadius: "10px", border: "1px solid #ddd", backgroundColor: "rgba(255, 255, 255, 0.8)" }} />
          <span onClick={() => setShowPassword(!showPassword)} style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", cursor: "pointer", color: "#007bff", fontSize: "20px" }}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        <div style={{ position: "relative" }}>
          <label style={{ color: "wheat" }}>Confirm New Password</label>
          <input type={showConfirmPassword ? "text" : "password"} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required style={{ width: "100%", padding: "12px", borderRadius: "10px", border: "1px solid #ddd", backgroundColor: "rgba(255, 255, 255, 0.8)" }} />
          <span onClick={() => setShowConfirmPassword(!showConfirmPassword)} style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", cursor: "pointer", color: "#007bff", fontSize: "20px" }}>
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        <button type="submit" style={{ padding: "14px", borderRadius: "10px", border: "none", backgroundColor: "#007bff", color: "#fff", fontSize: "16px", fontWeight: "600", cursor: "pointer", transition: "background 0.3s, transform 0.2s" }}>
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
