import React, { useState, useEffect } from "react";
import axios from "axios";

const UserLandingPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [travelCompanions, setTravelCompanions] = useState([]);
  const [interests, setInterests] = useState([]);

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

  const handleInterestChange = (e) => {
    const value = e.target.value;
    if (value && !interests.includes(value)) {
      setInterests([...interests, value]);
    }
  };

  return (
    <div className="landing-container">
      <div className="hero-section">
        <h1>Find Your Perfect Travel Companion</h1>
        <p>
          Connect with fellow travelers, share experiences, and make memories
          together
        </p>

        <div className="search-container">
          <div className="search-box">
            <input type="text" placeholder="From" />
            <input type="text" placeholder="To" />
            <input type="date" />
            <button className="search-btn">🔍 Search</button>
          </div>
          <p className="post-plan" onClick={() => setShowModal(true)}>
            Can't find anyone? <span>Post your own travel plan →</span>
          </p>
        </div>
      </div>

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
            <button className="connect-btn">Send Connection Request</button>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div
            className="modal"
            onClick={(e) => e.stopPropagation()} // Prevent closing on inside click
          >
            <h2>Post Your Travel Plan</h2>
            <input type="text" placeholder="From" />
            <input type="text" placeholder="To" />
            <input type="date" />
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
            <div className="tags">
              {interests.map((tag, i) => (
                <span className="tag" key={i}>
                  {tag}
                </span>
              ))}
            </div>
            <textarea placeholder="Travel Description"></textarea>
            <div className="modal-buttons">
              <button
                className="cancel-btn"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button className="post-btn">Post My Trip</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserLandingPage;
