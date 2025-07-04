import React, { useState } from "react";

const RegisterLogin = () => {
  const [state, setState] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("");
  const [username, setUsername] = useState("");
  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 px-3 px-sm-0 gradient-bg-color">
      <div className="input-container">
        <h2 className="text-center">
          {state === "Sign Up" ? "Create account" : "Login"}
        </h2>
        <p className="text-center">
          {state === "Sign Up"
            ? "Create your account"
            : "Login to your account !"}
        </p>
        <form>
          {state === "Sign Up" && (
            <div className="input-color mb-4 d-flex align-items-center gap-3 w-100 px-4 py-2 rounded-pill">
              <i class="fa-sharp-duotone fa-solid fa-circle-user"></i>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="bg-transparent outline-none"
                type="text"
                placeholder="FullName"
                required
              ></input>
            </div>
          )}
          {state === "Sign Up" && (
            <div className="input-color mb-4 d-flex align-items-center gap-3 w-100 px-4 py-2 rounded-pill">
              <i className="fa-solid fa-calendar-days"></i>
              <input
                onChange={(e) => setDob(e.target.value)}
                value={dob}
                className="form-control border-0 bg-transparent shadow-none"
                type="date"
                placeholder="Date of Birth"
                required
              />
            </div>
          )}

          {state === "Sign Up" && (
            <div className="input-color mb-4 d-flex align-items-center gap-3 w-100 px-4 py-2 rounded-pill">
              <i className="fa-solid fa-user"></i>
              <input
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                className="form-control border-0 bg-transparent shadow-none"
                type="text"
                placeholder="Username"
                required
              />
            </div>
          )}

          <div className="input-color mb-4 d-flex align-items-center gap-3 w-100 px-4 py-2 rounded-pill">
            <i class="fa-solid fa-envelope"></i>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="bg-transparent outline-none"
              type="email"
              placeholder="Email id"
              required
            ></input>
          </div>
          <div className="input-color mb-4 d-flex align-items-center gap-3 w-100 px-4 py-2 rounded-pill">
            <i class="fa-solid fa-lock"></i>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="bg-transparent outline-none"
              type="password"
              placeholder="Password"
              required
            ></input>
          </div>
          <p className="mb-3 forgot-password">Forgot password?</p>

          <button type="submit" className="btn w-100 submit-btn">
            {state}
          </button>
        </form>
        {state === "Sign Up" ? (
          <div>
            <span className="ms-3">Already have an account?</span>
            <span
              onClick={() => setState("Login")}
              className="ms-3 text-decoration-underline"
              style={{ color: "#60a5fa", cursor: "pointer" }}
            >
              Login here
            </span>
          </div>
        ) : (
          <div>
            <span className="ms-4"> Don't have an account?</span>
            <span
              onClick={() => setState("Sign Up")}
              className="ms-3 text-decoration-underline"
              style={{ color: "#60a5fa", cursor: "pointer" }}
            >
              Sign up
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegisterLogin;
