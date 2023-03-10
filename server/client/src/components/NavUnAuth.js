//ideally make a slice to in order to have global state of when a button is pressed or not. Then merge auth and unauth together. 
//have it change if authorized or unauthorized

import React from "react";

const Nav = () => {
  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg bg-primary">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">Lorem Ipsum</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/login">Login</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/register">Register</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

// <Link to="/home" className="nav-link active" aria-current="page">Home</Link>

export default Nav;