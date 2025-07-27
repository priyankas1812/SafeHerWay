import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import "./Css/UserLanding.css";

const UserLandingPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [travelCompanions, setTravelCompanions] = useState([]);
  const [interests, setInterests] = useState([]);
  const [searchFilters, setSearchFilters] = useState({
    source: "",
    destination: "",
    date: "",
  });

  const [form, setForm] = useState({
    source: "",
    destination: "",
    date: "",
    description: "",
  });

  const { userId } = useParams();

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

      <div
        className="text-gray-700 hover:text-blue-600 text-3xl cursor-pointer View-Profile"
        title="View Profile"
      >
        <FontAwesomeIcon icon={faUserCircle} />
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
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2
              style={{
                backgroundImage: "linear-gradient(to right, #6c63ff, #b06ab3)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontWeight: "bold",
              }}
            >
              Post Your Travel Plan
            </h2>
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
