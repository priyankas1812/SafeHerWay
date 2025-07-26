import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch users from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users/");
        setUsers(res.data); // API must return an array of user objects
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Count users by status
  const countByStatus = (status) =>
    users.filter((user) => user.status === status).length;

  return (
    <div className="admin-container">
      <header className="admin-header">
        <h2>Admin Dashboard</h2>
        <span>Welcome, Admin</span>
      </header>

      <div className="stats">
        <div className="card yellow">
          <span className="icon">⏳</span>
          <p>Pending</p>
          <h4>{countByStatus("Pending Review")}</h4>
        </div>
        <div className="card green">
          <span className="icon">✅</span>
          <p>Approved</p>
          <h4>{countByStatus("Approved")}</h4>
        </div>
        <div className="card red">
          <span className="icon">❌</span>
          <p>Rejected</p>
          <h4>{countByStatus("Rejected")}</h4>
        </div>
        <div className="card blue">
          <span className="icon">📊</span>
          <p>Total</p>
          <h4>{users.length}</h4>
        </div>
      </div>

      <div className="tabs">
        <button className="active">All Users</button>
        <button>Pending Review</button>
        <button>Approved</button>
        <button>Rejected</button>
      </div>

      <div className="user-list">
        {loading ? (
          <p>Loading users...</p>
        ) : (
          users.map((user, index) => {
            const initials =
              user.initials ||
              (user.name
                ? user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                : "NA");

            const maskedAadhaar = user.aadhaar
              ? `**** **** ${user.aadhaar.slice(-4)}`
              : "Not Provided";

            const userStatus = user.status || "Unknown";

            return (
              <div key={index} className="user-card">
                <div className="user-left">
                  <div className="avatar-circle">{initials}</div>
                  <div className="user-info">
                    <h4>{user.name || "Unnamed User"}</h4>
                    <p>ID: {user.userId || user._id || "N/A"}</p>
                    <p>Phone: {user.phone || "N/A"}</p>
                    <p>Email: {user.email || "N/A"}</p>
                    <p>Aadhaar: {maskedAadhaar}</p>
                    <p>
                      {userStatus === "Approved" ? "Approved:" : "Submitted:"}{" "}
                      {user.time || "N/A"}
                    </p>
                  </div>
                </div>

                <div className="user-status">
                  <span
                    className={`badge ${userStatus
                      .toLowerCase()
                      .replace(" ", "-")}`}
                  >
                    {userStatus}
                  </span>
                </div>

                <div className="user-btn">
                  <button
                    className={`btn ${
                      userStatus === "Approved" ? "view" : "review"
                    }`}
                  >
                    {userStatus === "Approved"
                      ? "View Details"
                      : "Review Details"}
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
