import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getStById, updateUser } from "../api/userService";
import { AuthContext } from "./AuthContext";

export const UpdateUser = () => {
    const { user } = useContext(AuthContext);
    const { userId } = useParams();
    const [fullName, setFullName] = useState(user?.fullName || '');
    const [email, setEmail] = useState(user?.email || '');
    const [mobile, setMobile] = useState(user?.mobile || '');
    const [address, setAddress] = useState(user?.address || '');
    
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = await getStById(userId);
                if (user) {
                    setFullName(user.fullName || "");
                    setEmail(user.email || "");
                    setMobile(user.mobile || "");
                    setAddress(user.address || "");
                }
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };
        if (userId) {
            fetchUser();
        }
    }, [userId]);

    const updateSubmit = async (e) => {
        e.preventDefault();
        if (!fullName || !email || !mobile || !address) {
            alert("All fields are required");
            return;
        }

        const updatedUser = {
            fullName,
            email,
            mobile,
            address,
        };

        try {
            setLoading(true);
            const response = await updateUser(userId, updatedUser);
            if (response) {
                setMessage("User updated successfully!");
                setTimeout(() => {
                    navigate("/users");
                }, 1000);
            } else {
                setMessage("Server Error. Try again.");
            }
        } catch (error) {
            setMessage(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
                background: "linear-gradient(to right, #141e30, #243b55)",
                padding: "20px",
            }}
        >
            <form
                onSubmit={updateSubmit}
                style={{
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    backdropFilter: "blur(10px)",
                    padding: "30px",
                    borderRadius: "15px",
                    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
                    color: "wheat",
                    maxWidth: "400px",
                    width: "100%",
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    gap: "15px",
                }}
            >
                <h2 style={{ fontSize: "24px", marginBottom: "15px", fontWeight: "700" }}>
                    Update User Info
                </h2>

                {message && (
                    <div
                        style={{
                            color: message.includes("Error") ? '#721c24' : '#28a745',
                            backgroundColor: message.includes("Error") ? '#f8d7da' : '#d4edda',
                            padding: '12px',
                            borderRadius: '8px',
                            textAlign: 'center',
                            fontSize: '14px',
                            border: message.includes("Error") ? '1px solid #f5c6cb' : '1px solid #c3e6cb',
                        }}
                    >
                        {message}
                    </div>
                )}

                <input
                    type="text"
                    placeholder="Full Name"
                    value={fullName || ''}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    style={inputStyle}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={inputStyle}
                />
                <input
                    type="text"
                    placeholder="Mobile"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    required
                    style={inputStyle}
                />
                <input
                    type="text"
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    style={inputStyle}
                />

                <button
                    type="submit"
                    disabled={loading}
                    style={buttonStyle}
                    onMouseOver={(e) => (e.target.style.backgroundColor = "#45a049")}
                    onMouseOut={(e) => (e.target.style.backgroundColor = "#4CAF50")}
                >
                    {loading ? "Updating..." : "Update"}
                </button>
                <button
                    type="button"
                    onClick={() => navigate("/users")}
                    style={backButtonStyle}
                    onMouseOver={(e) => (e.target.style.backgroundColor = "#ff6347")}
                    onMouseOut={(e) => (e.target.style.backgroundColor = "#ff4500")}
                >
                    Cancel
                </button>
            </form>
        </div>
    );
};

const inputStyle = {
    padding: "12px 16px",
    borderRadius: "10px",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    fontSize: "16px",
    outline: "none",
    transition: "border-color 0.3s, box-shadow 0.3s",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    color: "wheat",
    width: "100%",
    textAlign: "center",
};

const buttonStyle = {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "10px 20px",
    fontSize: "16px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
};

const backButtonStyle = {
    backgroundColor: "#ff4500",
    color: "white",
    padding: "10px 20px",
    fontSize: "16px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
};

export default UpdateUser;
