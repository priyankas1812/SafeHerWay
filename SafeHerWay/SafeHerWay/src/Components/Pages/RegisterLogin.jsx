import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const RegisterLogin = () => {
  const [state, setState] = useState("Sign Up");
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
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <div className="register-page d-flex min-vh-100">
      {/* Left Side with background image via CSS */}
      <div className="register-left d-none d-md-flex align-items-center justify-content-center"></div>

      {/* Right Side Form */}
      <div className="register-right d-flex align-items-center justify-content-center w-90 bg-white">
        <div
          className="form-wrapper p-4 p-md-5 shadow rounded-4 w-100"
          style={{ maxWidth: "600px" }}
        >
          <h3 className="mb-4 text-center fw-bold">
            {state === "Sign Up" ? "Registration" : "Login"}
          </h3>

          <form>
            <div className="row g-3">
              {state === "Sign Up" ? (
                <>
                  {/* Full Name */}
                  <div className="col-md-6 mb-3">
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Full Name"
                      required
                    />
                  </div>

                  {/* Username */}
                  <div className="col-md-6 mb-3">
                    <input
                      type="text"
                      name="username"
                      value={form.username}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Username"
                      required
                    />
                  </div>

                  {/* Date of Birth */}
                  <div className="col-md-6 mb-3">
                    <input
                      type="date"
                      name="dob"
                      value={form.dob}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Date of Birth"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div className="col-md-6 mb-3">
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Email"
                      required
                    />
                  </div>

                  {/* Mobile Number */}
                  <div className="col-md-6 mb-3">
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Mobile Number"
                      pattern="[0-9]{10}"
                      required
                    />
                  </div>

                  {/* Aadhaar Number */}
                  <div className="col-md-6 mb-3">
                    <input
                      type="text"
                      name="aadhaar"
                      value={form.aadhaar}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Aadhaar Number"
                      pattern="\d{12}"
                      maxLength={12}
                      required
                    />
                  </div>

                  {/* Password */}
                  <div className="col-md-6 mb-3">
                    <input
                      type="password"
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Password"
                      required
                    />
                  </div>

                  {/* Confirm Password */}
                  <div className="col-md-6 mb-3">
                    <input
                      type="password"
                      name="confirmPassword"
                      value={form.confirmPassword}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Confirm Password"
                      required
                    />
                  </div>
                </>
              ) : (
                <>
                  {/* Username & Password for Login */}
                  <div className="col-12">
                    <input
                      type="text"
                      name="username"
                      value={form.username}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Username"
                      required
                    />
                  </div>
                  <div className="col-12">
                    <input
                      type="password"
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Password"
                      required
                    />
                  </div>
                </>
              )}
            </div>

            {/* Submit Button */}
            <div className="d-grid mt-4">
              <button
                type="submit"
                className="btn btn-primary rounded-pill py-2"
              >
                {state === "Sign Up" ? "Next Step" : "Login"}
              </button>
            </div>
          </form>

          {/* Footer Link Toggle */}
          <p className="text-center mt-3">
            {state === "Sign Up" ? (
              <>
                Already have an account?{" "}
                <span
                  onClick={() => setState("Login")}
                  className="text-primary text-decoration-underline"
                  style={{ cursor: "pointer" }}
                >
                  Sign in
                </span>
              </>
            ) : (
              <>
                Don't have an account?{" "}
                <span
                  onClick={() => setState("Sign Up")}
                  className="text-primary text-decoration-underline"
                  style={{ cursor: "pointer" }}
                >
                  Sign up
                </span>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterLogin;
