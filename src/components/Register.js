import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../api/userService";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import Font Awesome icons

export default function Register({ setUserEmail }) {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [mobile, setMobile] = useState("");
    const [address, setAddress] = useState("");
    const [error, setError] = useState(""); 
    const [showPassword, setShowPassword] = useState(false); 
    const [showConfirmPassword, setShowConfirmPassword] = useState(false); 
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(""); 
        if (!fullName || !email || !password || !confirmPassword || !mobile || !address) {
            setError("All fields are required.");
            return;
        }
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
    
        try {
            const userData = { fullName, email, password, confirmPassword, mobile, address };
            
            console.log("Sending data:", userData);
    
            const response = await register(userData);

            if (response.error) {
                setError(response.error);
            } else if (response.message) {
                setUserEmail(email); 
                window.confirm(response.message);
                navigate("/verify");
            } else {
                setError("Registration failed. Please try again.");
            }
        } catch (error) {
            console.error("Registration error:", error);
            setError(error.error || "Something went wrong. Please try again.");
        }
    };

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
                onSubmit={handleSubmit}
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
                        color:'wheat'
                    }}
                >
                    Create Your Account
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
                        placeholder="Full Name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
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
                        onFocus={(e) => {
                            e.target.style.borderColor = "#007bff";
                            e.target.style.boxShadow = "0 0 8px rgba(0, 123, 255, 0.3)";
                        }}
                        onBlur={(e) => {
                            e.target.style.borderColor = "#ddd";
                            e.target.style.boxShadow = "none";
                        }}
                    />
    
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                        onFocus={(e) => {
                            e.target.style.borderColor = "#007bff";
                            e.target.style.boxShadow = "0 0 8px rgba(0, 123, 255, 0.3)";
                        }}
                        onBlur={(e) => {
                            e.target.style.borderColor = "#ddd";
                            e.target.style.boxShadow = "none";
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
                            onFocus={(e) => {
                                e.target.style.borderColor = "#007bff";
                                e.target.style.boxShadow = "0 0 8px rgba(0, 123, 255, 0.3)";
                            }}
                            onBlur={(e) => {
                                e.target.style.borderColor = "#ddd";
                                e.target.style.boxShadow = "none";
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
    
                    <div style={{ position: "relative" }}>
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
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
                            onFocus={(e) => {
                                e.target.style.borderColor = "#007bff";
                                e.target.style.boxShadow = "0 0 8px rgba(0, 123, 255, 0.3)";
                            }}
                            onBlur={(e) => {
                                e.target.style.borderColor = "#ddd";
                                e.target.style.boxShadow = "none";
                            }}
                        />
                        <span
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>

                    <input
                        type="tel"
                        placeholder="Mobile"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
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

                    <input
                        type="text"
                        placeholder="Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
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
                    onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
                    onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
                    onMouseDown={(e) => (e.target.style.transform = "scale(0.98)")}
                    onMouseUp={(e) => (e.target.style.transform = "scale(1)")}
                >
                    Register
                </button>
            </form>
        </div>
    );
}
