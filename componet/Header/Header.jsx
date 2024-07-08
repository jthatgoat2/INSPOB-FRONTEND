import React from "react";
import { Link } from "react-router-dom";
import "./Header.scss"; // Ensure you keep your custom styles if necessary
import "bootstrap/dist/css/bootstrap.css";

function Header() {
  return (
    <header>
      <div className="header__top d-flex justify-content-between align-items-center p-3">
        <Link to="/">
          <img className="header__logo" src="src/assets/2.svg" alt="logo" />
        </Link>
      </div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light header__nav">
        <div className="container-fluid">
          <Link className="nav-link btn btn-primary" to="/canvas">
            Create a New Canvas
          </Link>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/faq">
                  FAQ
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/future-updates">
                  Future Updates
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
