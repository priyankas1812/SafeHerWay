import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import "./Css/UserLanding.css";
import ChatPage from "./chatPage";

const UserLandingPage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [travelCompanions, setTravelCompanions] = useState([]);
  const [interests, setInterests] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);
  const [connectionRequests, setConnectionRequests] = useState([]);

  const [form, setForm] = useState({
    source: "",
    destination: "",
    date: "",
    description: "",
  });

  const [searchFilters, setSearchFilters] = useState({
    source: "",
    destination: "",
    date: "",
  });

  useEffect(() => {
    const fetchTravelPlans = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/userTravels");
        setTravelCompanions(res.data);
      } catch (err) {
        console.error("Error fetching travel plans:", err);
      }
    };
    fetchTravelPlans();
  }, []);

  const handleSidebarToggle = async () => {
    setShowSidebar(!showSidebar);

    if (!showSidebar) {
      try {
        console.log("the user Id", userId);

        const res = await axios.post("http://localhost:5000/api/getConReq", {
          toUserId: userId, // ✅ Send in POST body
        });
        setConnectionRequests(res.data.requests); // ✅ access .requests from response
      } catch (err) {
        console.error("Failed to fetch connection requests:", err);
        alert("Error fetching connection requests.");
      }
    }
  };
  const handleAccept = async (reqId) => {
    try {
      await axios.put(`http://localhost:5000/api/connectionRequests/${reqId}`, {
        status: "accepted",
      });
      alert("Accepted successfully!");
      setConnectionRequests((prev) => prev.filter((req) => req._id !== reqId));
    } catch (err) {
      console.error("Accept failed:", err);
      alert("Failed to accept.");
    }
  };
  const [acceptedConnections, setAcceptedConnections] = useState([]);

  const handleReject = async (reqId) => {
    try {
      await axios.put(`http://localhost:5000/api/connectionRequests/${reqId}`, {
        status: "rejected",
      });
      alert("Rejected.");
      setConnectionRequests((prev) => prev.filter((req) => req._id !== reqId));
    } catch (err) {
      console.error("Reject failed:", err);
      alert("Failed to reject.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleInterestChange = (e) => {
    const value = e.target.value;
    if (value && !interests.includes(value)) {
      setInterests([...interests, value]);
    }
  };

  const handlePostTrip = async () => {
    const { source, destination, date, description } = form;
    if (!source || !destination || !date) {
      alert("Please fill all required fields.");
      return;
    }

    const data = {
      userId,
      source,
      destination,
      date,
      interests,
      description,
    };

    try {
      await axios.post("http://localhost:5000/api/usertravel", data);
      alert("Trip posted successfully!");
      setShowModal(false);

      const res = await axios.get("http://localhost:5000/api/userTravels");
      setTravelCompanions(res.data);

      setForm({ source: "", destination: "", date: "", description: "" });
      setInterests([]);
    } catch (err) {
      console.error("Failed to post trip:", err);
      alert("Something went wrong!");
    }
  };

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/userTravels/search",
        {
          params: searchFilters,
        }
      );
      setTravelCompanions(res.data);
    } catch (err) {
      console.error("Search failed:", err);
      alert("Search failed");
    }
  };

  const handleSendRequest = async (travelPlan) => {
    const fromUserId = userId;
    const toUserId = travelPlan.user?._id;
    const travelplanId = travelPlan._id;

    const data = {
      fromUserId,
      toUserId,
      travelplanId,
    };

    try {
      await axios.post("http://localhost:5000/api/sendConReq", data);
      alert("Connection request sent!");
    } catch (err) {
      console.error("Error sending request:", err);
      alert("Failed to send connection request.");
    }
  };

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/user/${userId}`);
        setUserData(res.data); // Assuming res.data contains the user object
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };

    fetchUser();
  }, [userId]);

  return (
    <div className="landing-container">
      {/* Hero and Search Section */}
      <div className="hero-section">
        <h1>Find Your Perfect Travel Companion</h1>
        <p>
          Connect with fellow travelers, share experiences, and make memories
          together
        </p>

        <div className="search-container">
          <div className="search-box">
            <input
              type="text"
              name="source"
              placeholder="From"
              value={searchFilters.source}
              onChange={handleSearchChange}
            />
            <input
              type="text"
              name="destination"
              placeholder="To"
              value={searchFilters.destination}
              onChange={handleSearchChange}
            />
            <input
              type="date"
              name="date"
              value={searchFilters.date}
              onChange={handleSearchChange}
            />
            <button className="search-btn" onClick={handleSearch}>
              🔍 Search
            </button>
          </div>
          <p className="post-plan" onClick={() => setShowModal(true)}>
            Can't find anyone? <span>Post your own travel plan →</span>
          </p>
        </div>
      </div>

      {/* Profile icon */}
      <div
        className="text-gray-700 hover:text-blue-600 text-3xl cursor-pointer View-Profile"
        title="View Profile"
        onClick={handleSidebarToggle}
      >
        <FontAwesomeIcon icon={faUserCircle} />
        {userData && <p className="profile-name">{userData.name}</p>}
      </div>

      {/* Sidebar */}
      {showSidebar && (
        <div className="sidebar">
          <h2>Connection Requests</h2>
          {connectionRequests.length === 0 ? (
            <p>No requests found.</p>
          ) : (
            connectionRequests.map((req) => (
              <div className="request-card" key={req._id}>
                <h4>{req.fromUser?.name || "Unknown"}</h4>
                <p>{req.fromUser?.age || "N/A"} years old</p>
                <p>
                  📍 {req.travelPlan?.source} → {req.travelPlan?.destination}
                </p>
                <p>📅 {new Date(req.travelPlan?.date).toLocaleDateString()}</p>
                <button
                  onClick={() => handleAccept(req._id)}
                  className="accept-btn"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleReject(req._id)}
                  className="reject-btn"
                >
                  Reject
                </button>
              </div>
            ))
          )}
        </div>
      )}

      {/* Companion Cards */}
      {/* <div className="card-container">
        {travelCompanions.map((comp, i) => (
          <div className="companion-card" key={i}>
            <h3>{comp?.user?.name || "Anonymous"}</h3>
            <p>{comp?.user?.age || "N/A"} years old</p>
            <p>
              📍 {comp.source} → {comp.destination}
            </p>
            <p>📅 {new Date(comp.date).toLocaleDateString()}</p>
            <div className="tags">
              {comp.interests?.map((tag, idx) => (
                <span className="tag" key={idx}>
                  {tag}
                </span>
              ))}
            </div>
            <button
              className="connect-btn"
              onClick={() => handleSendRequest(comp)}
            >
              Send Connection Request
            </button>
          </div>
        ))}
      </div> */}

      <div className="card-container">
        {travelCompanions.map((comp, i) => (
          <div className="companion-card" key={i}>
            <h3>{comp?.user?.name || "Anonymous"}</h3>
            <p>{comp?.user?.age || "N/A"} years old</p>
            <p>
              📍 {comp.source} → {comp.destination}
            </p>
            <p>📅 {new Date(comp.date).toLocaleDateString()}</p>

            <div className="tags">
              {comp.interests?.map((tag, idx) => (
                <span className="tag" key={idx}>
                  {tag}
                </span>
              ))}
            </div>

            {comp.isAccepted ? (
              <div className="action-buttons">
                <button
                  className="chat-btn"
                  onClick={() => navigate("/ChatPage")}
                >
                  💬 Chat
                </button>
                <button className="call-btn">📞 Call</button>
              </div>
            ) : (
              <button
                className="connect-btn"
                onClick={() => handleSendRequest(comp)}
              >
                Send Connection Request
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Modal for Posting Trip */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2 className="gradient-text">Post Your Travel Plan</h2>
            <input
              type="text"
              name="source"
              placeholder="From"
              value={form.source}
              onChange={handleChange}
            />
            <input
              type="text"
              name="destination"
              placeholder="To"
              value={form.destination}
              onChange={handleChange}
            />
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Add Interest (e.g., Movies)"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleInterestChange(e);
                  e.target.value = "";
                }
              }}
            />
            <textarea
              placeholder="Travel Description"
              name="description"
              value={form.description}
              onChange={handleChange}
            ></textarea>
            <div className="modal-buttons">
              <button
                className="cancel-btn"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button className="post-btn" onClick={handlePostTrip}>
                Post My Trip
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserLandingPage;
