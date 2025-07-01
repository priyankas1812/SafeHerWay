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
            {/* Search Icon triggers modal */}
            <i className="bi bi-search text-white fs-5" type="button" data-bs-toggle="modal" data-bs-target="#searchModal"></i>

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

      {/* Search Modal */}
      <div className="modal fade" id="searchModal" tabIndex="-1" aria-labelledby="searchModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content bg-dark text-white">
            <div className="modal-header border-0">
              <h5 className="modal-title" id="searchModalLabel">
                Search
              </h5>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="input-group modal-input">
                <input type="text" className="form-control" placeholder="Search here..." />
                <span className="input-group-text bg-white">
                  <i className="bi bi-search text-dark"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Nav;
