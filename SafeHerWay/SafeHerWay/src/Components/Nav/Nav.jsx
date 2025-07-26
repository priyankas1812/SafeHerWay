import React from "react";
import "./Nav.css";

const Nav = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-black rounded-bottom px-4 py-3 custom-nav">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <a className="navbar-brand text-white fw-bold" href="#">
            Safe <span className="text-info">Her</span> Way
          </a>

          <div className="d-flex gap-4 align-items-center">
            <a className="nav-link text-white" href="#">
              Home
            </a>
            <a className="nav-link text-white" href="#">
              About
            </a>
            <a className="nav-link text-white" href="#">
              Tour
            </a>
            <a className="nav-link text-white" href="#">
              Blog
            </a>
            <a className="nav-link text-white" href="#">
              Contact
            </a>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Nav;
