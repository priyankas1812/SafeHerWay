// AdminDashboard.jsx
import React from "react";
import "./AdminDashboard.css";

const users = [
  {
    initials: "RK",
    name: "Rahul Kumar",
    id: "USR001",
    phone: "+91 98765 43210",
    email: "rahul.k@email.com",
    aadhaar: "**** **** 1234",
    time: "2 hours ago",
    status: "Pending Review",
  },
  {
    initials: "PS",
    name: "Priya Sharma",
    id: "USR002",
    phone: "+91 87654 32109",
    email: "priya.s@email.com",
    aadhaar: "**** **** 5678",
    time: "5 hours ago",
    status: "Pending Review",
  },
  {
    initials: "AS",
    name: "Amit Singh",
    id: "USR003",
    phone: "+91 76543 21098",
    email: "amit.s@email.com",
    aadhaar: "**** **** 9012",
    time: "Yesterday",
    status: "Approved",
  },
];

const AdminDashboard = () => {
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
          <h4>12</h4>
        </div>
        <div className="card green">
          <span className="icon">✅</span>
          <p>Approved</p>
          <h4>45</h4>
        </div>
        <div className="card red">
          <span className="icon">❌</span>
          <p>Rejected</p>
          <h4>8</h4>
        </div>
        <div className="card blue">
          <span className="icon">📊</span>
          <p>Total</p>
          <h4>65</h4>
        </div>
      </div>

      <div className="tabs">
        <button className="active">All Users</button>
        <button>Pending Review</button>
        <button>Approved</button>
        <button>Rejected</button>
      </div>

      <div className="user-list">
        {users.map((user, index) => (
          <div key={index} className="user-card">
            <div className="user-left">
              <div className="avatar-circle">{user.initials}</div>
              <div className="user-info">
                <h4>{user.name}</h4>
                <p>ID: {user.id}</p>
                <p>Phone: {user.phone}</p>
                <p>Email: {user.email}</p>
                <p>Aadhaar: {user.aadhaar}</p>
                <p>
                  {user.status === "Approved" ? "Approved:" : "Submitted:"} {user.time}
                </p>
              </div>
            </div>
            <div className="user-status">
              <span className={`badge ${user.status.toLowerCase().replace(" ", "-")}`}>
                {user.status}
              </span>
            </div>
            <div className="user-btn">
              <button
                className={`btn ${user.status === "Approved" ? "view" : "review"}`}
              >
                {user.status === "Approved" ? "View Details" : "Review Details"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;