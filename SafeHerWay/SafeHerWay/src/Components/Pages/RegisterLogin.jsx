import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const RegisterLogin = () => {
  const [state, setState] = useState("Sign Up");
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [otpInput, setOtpInput] = useState("");
  const [otpMessage, setOtpMessage] = useState("");
  const [otpError, setOtpError] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    dob: "",
    username: "",
    position: "",
    country: "",
    city: "",
    phone: "",
    gender: "",
    aadhaar: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      if (state === "Sign Up") {
        const response = await axios.post("http://localhost:5000/api/otp/generate", {
          email: form.email.toLowerCase(),
        });

        if (response.status === 200) {
          setShowOTPModal(true);
        }
      } else {
        alert("Login logic not implemented.");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      alert(error.response?.data?.error || "Failed to send OTP");
    }
  };

  const handleOTPVerify = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/otp/verify", {
        email: form.email.toLowerCase(),
        otp: otpInput,
      });

      if (response.status === 200) {
        setOtpMessage("✅ OTP verified successfully!");
        setOtpError("");

        // Call createUser API
        const createRes = await axios.post("http://localhost:5000/api/users", {
          name: form.name,
          userName: form.username, 
          email: form.email.toLowerCase(),
          password: form.password,
          age: form.dob, 
          phone: form.phone,
          aadharNumber: form.aadhaar, 
        });

        if (createRes.status === 201 || createRes.status === 200) {
          setOtpMessage("🎉 User created successfully!");
          setOtpError("");

          setTimeout(() => {
            setShowOTPModal(false);
            setOtpInput("");
            setOtpMessage("");
          }, 2000);
        } else {
          setOtpError("❌ Failed to create user.");
        }
      }
    } catch (error) {
      console.error("OTP or user creation error:", error);
      setOtpError(error.response?.data?.error || "❌ OTP verification or user creation failed.");
      setOtpMessage("");
    }
  };

  return (
    <div className="register-page d-flex min-vh-100">
      <div className="register-left d-none d-md-flex align-items-center justify-content-center"></div>

      <div className="register-right d-flex align-items-center justify-content-center w-90 bg-white">
        <div className="form-wrapper p-4 p-md-5 shadow rounded-4 w-100" style={{ maxWidth: "600px" }}>
          <h3 className="mb-4 text-center fw-bold">{state === "Sign Up" ? "Registration" : "Login"}</h3>

          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              {state === "Sign Up" ? (
                <>
                  <div className="col-md-6 mb-3">
                    <input type="text" name="name" value={form.name} onChange={handleChange} className="form-control" placeholder="Full Name" required />
                  </div>
                  <div className="col-md-6 mb-3">
                    <input type="text" name="username" value={form.username} onChange={handleChange} className="form-control" placeholder="Username" required />
                  </div>
                  <div className="col-md-6 mb-3">
                    <input type="date" name="dob" value={form.dob} onChange={handleChange} className="form-control" required />
                  </div>
                  <div className="col-md-6 mb-3">
                    <input type="email" name="email" value={form.email} onChange={handleChange} className="form-control" placeholder="Email" required />
                  </div>
                  <div className="col-md-6 mb-3">
                    <input type="tel" name="phone" value={form.phone} onChange={handleChange} className="form-control" placeholder="Mobile Number" pattern="[0-9]{10}" required />
                  </div>
                  <div className="col-md-6 mb-3">
                    <input type="text" name="aadhaar" value={form.aadhaar} onChange={handleChange} className="form-control" placeholder="Aadhaar Number" pattern="\d{12}" maxLength={12} required />
                  </div>
                  <div className="col-md-6 mb-3">
                    <input type="password" name="password" value={form.password} onChange={handleChange} className="form-control" placeholder="Password" required />
                  </div>
                  <div className="col-md-6 mb-3">
                    <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} className="form-control" placeholder="Confirm Password" required />
                  </div>
                </>
              ) : (
                <>
                  <div className="col-12">
                    <input type="text" name="username" value={form.username} onChange={handleChange} className="form-control" placeholder="Username" required />
                  </div>
                  <div className="col-12">
                    <input type="password" name="password" value={form.password} onChange={handleChange} className="form-control" placeholder="Password" required />
                  </div>
                </>
              )}
            </div>

            <div className="d-grid mt-4">
              <button type="submit" className="btn btn-primary rounded-pill py-2">
                {state === "Sign Up" ? "Next Step" : "Login"}
              </button>
            </div>
          </form>

          <p className="text-center mt-3">
            {state === "Sign Up" ? (
              <>
                Already have an account?{" "}
                <span onClick={() => setState("Login")} className="text-primary text-decoration-underline" style={{ cursor: "pointer" }}>
                  Sign in
                </span>
              </>
            ) : (
              <>
                Don't have an account?{" "}
                <span onClick={() => setState("Sign Up")} className="text-primary text-decoration-underline" style={{ cursor: "pointer" }}>
                  Sign up
                </span>
              </>
            )}
          </p>
        </div>
      </div>

      {/* OTP Modal */}
      {showOTPModal && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Enter OTP</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => {
                    setShowOTPModal(false);
                    setOtpInput("");
                    setOtpMessage("");
                    setOtpError("");
                  }}
                ></button>
              </div>
              <div className="modal-body">
                <input type="text" maxLength={6} className="form-control mb-3" placeholder="Enter 6-digit OTP" value={otpInput} onChange={(e) => setOtpInput(e.target.value)} />
                {otpMessage && <div className="alert alert-success text-center py-2">{otpMessage}</div>}
                {otpError && <div className="alert alert-danger text-center py-2">{otpError}</div>}
              </div>
              <div className="modal-footer">
                <button className="btn btn-primary" onClick={handleOTPVerify}>
                  Verify OTP
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowOTPModal(false);
                    setOtpInput("");
                    setOtpMessage("");
                    setOtpError("");
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterLogin;
