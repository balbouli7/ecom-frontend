import { useEffect, useState } from "react";
import { getAllUsers } from "../api/userService";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";

const GetAllUsers = ({ onDelete }) => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchBy, setSearchBy] = useState("fullName");
  const navigate = useNavigate();

  const fetchUsers = async () => {
    const data = await getAllUsers();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      await onDelete(id);
      fetchUsers();
    }
  };

  const filteredUsers = users.filter((user) => {
    const value = user[searchBy]?.toString().toLowerCase();
    return value?.includes(searchTerm.toLowerCase());
  });

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "#f5f5f5",  // Light gray background
        padding: "20px",
        fontFamily: "'Inter', sans-serif",  // Modern font
      }}
    >
      <div
        style={{
          background: "#fff",  // White background for the container
          padding: "40px",
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",  // Soft shadow
          width: "100%",
          maxWidth: "1200px",
        }}
      >
        <h2
          className="text-center mb-4"
          style={{
            fontWeight: '600',
            fontSize: '28px',
            color: "#333",  // Dark gray for text
          }}
        >
          Users List
        </h2>

        {/* Search Bar */}
        <div className="mb-4 d-flex align-items-center">
          <input
            type="text"
            placeholder={`Search by ${searchBy}`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #e9ecef",
              flex: 1,
              marginRight: "10px",
            }}
          />
          <select
            value={searchBy}
            onChange={(e) => setSearchBy(e.target.value)}
            style={{
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #e9ecef",
              backgroundColor: "#fff",
            }}
          >
            <option value="fullName">Full Name</option>
            <option value="email">Email</option>
            <option value="mobile">Mobile</option>
            <option value="id">ID</option>
            <option value="role">Role</option>
            <option value="address">Address</option>
          </select>
        </div>

        {/* Table */}
        <div
          className="table-container"
          style={{
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <table
            className="table table-responsive-sm"
            style={{
              color: '#333',
              fontSize: '16px',
              borderCollapse: 'collapse',
              textAlign: 'center',
              width: "100%",
            }}
          >
            <thead
              style={{
                background: "#f8f9fa",  // Light gray for header
                fontWeight: "600",
                borderBottom: "2px solid #e9ecef",  // Subtle border
              }}
            >
              <tr>
                <th style={{ padding: "16px" }}>#</th>
                <th style={{ padding: "16px" }}>Full Name</th>
                <th style={{ padding: "16px" }}>Email</th>
                <th style={{ padding: "16px" }}>Mobile</th>
                <th style={{ padding: "16px" }}>Address</th>
                <th style={{ padding: "16px" }}>Role</th>
                <th style={{ padding: "16px" }}>Creation Date</th>
                <th style={{ padding: "16px" }}>Updating Date</th>
                <th style={{ padding: "16px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr
                  key={user._id}
                  style={{
                    borderBottom: "1px solid #e9ecef",  // Subtle border for rows
                    transition: "background 0.2s ease",  // Smooth hover effect
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.background = "#f8f9fa")}  // Light gray on hover
                  onMouseOut={(e) => (e.currentTarget.style.background = "#fff")}  // White on mouse out
                >
                  <td style={{ padding: "16px" }}>{index + 1}</td>
                  <td style={{ padding: "16px" }}>{user.fullName}</td>
                  <td style={{ padding: "16px" }}>{user.email}</td>
                  <td style={{ padding: "16px" }}>{user.mobile}</td>
                  <td style={{ padding: "16px" }}>{user.address}</td>
                  <td style={{ padding: "16px" }}>{user.role}</td>
                  <td style={{ padding: "16px" }}>{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td style={{ padding: "16px" }}>{new Date(user.updatedAt).toLocaleDateString()}</td>
                  <td style={{ padding: "16px" }}>
                    <button
                      className="btn btn-info btn-sm me-2"
                      style={{
                        backgroundColor: '#17a2b8',
                        border: 'none',
                        color: '#fff',
                        borderRadius: '6px',
                        padding: '8px 16px',
                        transition: 'all 0.3s ease',
                      }}
                      onClick={() => navigate(`/users/details/${user._id}`)}
                      onMouseOver={(e) => (e.target.style.backgroundColor = '#138496')}
                      onMouseOut={(e) => (e.target.style.backgroundColor = '#17a2b8')}
                    >
                      View
                    </button>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      style={{
                        backgroundColor: '#ffc107',
                        border: 'none',
                        color: '#fff',
                        borderRadius: '6px',
                        padding: '8px 16px',
                        transition: 'all 0.3s ease',
                      }}
                      onClick={() => navigate(`updateUser/${user._id}`)}
                      onMouseOver={(e) => (e.target.style.backgroundColor = '#e0a800')}
                      onMouseOut={(e) => (e.target.style.backgroundColor = '#ffc107')}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      style={{
                        backgroundColor: '#dc3545',
                        border: 'none',
                        color: '#fff',
                        borderRadius: '6px',
                        padding: '8px 16px',
                        transition: 'all 0.3s ease',
                      }}
                      onClick={() => handleDelete(user._id)}
                      onMouseOver={(e) => (e.target.style.backgroundColor = '#c82333')}
                      onMouseOut={(e) => (e.target.style.backgroundColor = '#dc3545')}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GetAllUsers;