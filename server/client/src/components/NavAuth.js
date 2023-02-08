import React from "react";
import { Link } from "react-router-dom";
import { logOut } from "../features/auth/authSlice";
import { useDispatch } from "react-redux";

const Nav = () => {
  const dispatch = useDispatch();



  return (
    <nav className="navbar navbar-dark navbar-expand-lg bg-primary">
      <div className="container-fluid">
        <Link to="/home" className="navbar-brand"  aria-current="page">Lone Star Nails</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/home" className="nav-link active" aria-current="page">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/tickets" className="nav-link active" aria-current="page">Tickets</Link>
            </li>
            <li className="nav-item">
              <Link to="/payroll" className="nav-link active" aria-current="page">Payroll</Link>
            </li>
            <li className="nav-item">
              <Link to="/employees" className="nav-link active" aria-current="page">Employees</Link>
            </li>
            <li className="nav-item">
              <Link to="/invoice" className="nav-link active" aria-current="page">Invoice</Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" onClick={()=>dispatch(logOut)}href="/">Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

// <Link to="/home" className="nav-link active" aria-current="page">Home</Link>

export default Nav;