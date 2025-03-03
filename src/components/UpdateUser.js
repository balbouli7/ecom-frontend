import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCurrentUser, getStById, updateUser } from "../api/userService";

export const UpdateUser = () => {
    const { userId } = useParams();
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [address, setAddress] = useState("");
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
                }, 2000);
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
                backgroundImage: 'url(https://source.unsplash.com/1600x900/?technology,abstract)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '100vh',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: 0,
                padding: 0,
                overflow: 'hidden',
            }}
        >
            <form
                onSubmit={updateSubmit}
                style={{
                    maxWidth: '500px',
                    width: '100%',
                    margin: '20px',
                    padding: '30px',
                    borderRadius: '15px',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                    backgroundColor: 'rgba(255, 255, 255, 0)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '15px',
                }}
            >
                <h2
                    style={{
                        textAlign: 'center',
                        color: 'wheat',
                        fontSize: '28px',
                        fontWeight: '700',
                    }}
                >
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
                    value={fullName}
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
                    style={{
                        padding: '14px',
                        borderRadius: '10px',
                        border: 'none',
                        backgroundColor: '#007bff',
                        color: '#fff',
                        fontSize: '16px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'background 0.3s, transform 0.2s',
                        marginTop: '10px',
                    }}
                    onMouseOver={(e) => (e.target.style.backgroundColor = '#0056b3')}
                    onMouseOut={(e) => (e.target.style.backgroundColor = '#007bff')}
                    onMouseDown={(e) => (e.target.style.transform = 'scale(0.98)')}
                    onMouseUp={(e) => (e.target.style.transform = 'scale(1)')}
                >
                    {loading ? "Updating..." : "Update"}
                </button>
            </form>
        </div>
    );
};

const inputStyle = {
    padding: '12px 16px',
    borderRadius: '10px',
    border: '1px solid #ddd',
    fontSize: '16px',
    outline: 'none',
    transition: 'border-color 0.3s, box-shadow 0.3s',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    width: '100%',
};

export default UpdateUser;
