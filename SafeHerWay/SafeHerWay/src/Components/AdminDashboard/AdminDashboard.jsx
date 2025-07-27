import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users/");
        console.log("rrr", res);

        setUsers(res.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleVerify = async (action, userId) => {
    try {
      const url = `http://localhost:5000/api/${userId}/verify`;

      const response = await axios.patch(url, {
        action: action,
      });

      alert(`User ${action}d successfully`);

      // Update frontend list
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId
            ? {
                ...user,
                status: action === "approve" ? "Approved" : "Rejected",
              }
            : user
        )
      );

      setShowModal(false);
    } catch (error) {
      console.error(`Failed to ${action} user:`, error);
      alert(`Failed to ${action} user.`);
    }
  };

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
                    <p>Aadhaar: {user.aadharNumber}</p>
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
                    onClick={() => {
                      setSelectedUser(user);
                      setShowModal(true);
                    }}
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

      {/* Modal Popup */}
      {showModal && selectedUser && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-btn" onClick={() => setShowModal(false)}>
              ✖
            </button>
            <h3>{selectedUser.name || "User"}'s Details</h3>
            <p>
              <strong>User ID:</strong>{" "}
              {selectedUser.userId || selectedUser._id}
            </p>
            <p>
              <strong>Phone:</strong> {selectedUser.phone || "N/A"}
            </p>
            <p>
              <strong>Email:</strong> {selectedUser.email || "N/A"}
            </p>
            <p>
              <strong>Aadhaar:</strong>
              {selectedUser.aadharNumber || "N/A"}
            </p>
            <div className="modal-actions">
              <button
                className="btn approve"
                onClick={() => handleVerify("approve", selectedUser._id)}
              >
                ✅ Approve
              </button>
              <button
                className="btn reject"
                onClick={() => handleVerify("reject", selectedUser._id)}
              >
                ❌ Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
