import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/userService";
import { AuthContext } from "./AuthContext";
import { FaEye, FaEyeSlash } from 'react-icons/fa';  

const Login = () => {
  const [identifier, setIdentifier] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false); 

  const { setUser } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const data = await login(identifier, password)
      setUser(data.user)
      localStorage.setItem("token", data.token)
      navigate("/home")
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong")
      // if (err.message.toLowerCase().includes("Please verify your account before logging in.")) {
      //   navigate("/verify");
      // } else {
      //   setError(err.message);
      // }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      style={{
        backgroundImage: 'url(https://img.freepik.com/free-photo/interior-clothing-store-with-stylish-merchandise-racks-fashionable-brand-design-casual-wear-modern-boutique-empty-fashion-showroom-shopping-centre-with-elegant-merchandise_482257-65537.jpg)',
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
        onSubmit={handleLogin}
        style={{
          maxWidth: "450px",
          width: "100%",
          margin: "20px",
          padding: "30px",
          borderRadius: "15px",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
          backgroundColor: "rgba(255, 255, 255, 0)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            color: "#333",
            marginBottom: "20px",
            fontSize: "28px",
            fontWeight: "700",
            letterSpacing: "-0.5px",
            color: 'wheat'
          }}
        >
          Login to Your Account
        </h2>
  
        {error && (
          <div
            style={{
              color: "#721c24",
              backgroundColor: "#f8d7da",
              padding: "12px",
              borderRadius: "8px",
              textAlign: "center",
              fontSize: "14px",
              border: "1px solid #f5c6cb",
            }}
          >
            {error}
          </div>
        )}
  
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <input
            type="text"
            placeholder="Email or Mobile"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
            style={{
              padding: "12px 16px",
              borderRadius: "10px",
              border: "1px solid #ddd",
              fontSize: "16px",
              outline: "none",
              transition: "border-color 0.3s, box-shadow 0.3s",
              backgroundColor: "rgba(255, 255, 255, 0.8)",
            }}
          />
  
          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                padding: "12px 16px",
                borderRadius: "10px",
                border: "1px solid #ddd",
                fontSize: "16px",
                outline: "none",
                transition: "border-color 0.3s, box-shadow 0.3s",
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                width: "100%",
              }}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
                color: "#007bff",
                fontSize: "20px",
              }}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
  
          <button
            type="submit"
            style={{
              padding: "14px",
              borderRadius: "10px",
              border: "none",
              backgroundColor: "#007bff",
              color: "#fff",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "background 0.3s, transform 0.2s",
              marginTop: "10px",
            }}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          
          <a href="/forgetpassword" style={{ textAlign: "center", color: "#007bff", marginTop: "10px"}}>
            Forgot Password?
          </a>
        </div>
  
        <p style={{ textAlign: "center", marginTop: "20px" }}>
          Don't have an account? <a href="/register" style={{ color: "#007bff" }}>Sign up</a>
        </p>
      </form>
    </div>
  );
}

export default Login;
