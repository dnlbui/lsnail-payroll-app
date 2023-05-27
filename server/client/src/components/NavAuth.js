import React from "react";
import { Link } from "react-router-dom";
import { logOut } from "../features/auth/authSlice";
import { useDispatch } from "react-redux";
// get signed in user's role
import { selectCurrentRole } from "../features/auth/authSlice";

import { useSelector } from "react-redux";



const Nav = () => {
  const dispatch = useDispatch();
  const role = useSelector(selectCurrentRole);
  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg bg-primary">
      <div className="container-fluid">
        <Link to="/home" className="navbar-brand"  aria-current="page">Lorem Ipsum!</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/home" className="nav-link active" aria-current="page">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/tickets" className="nav-link" >Tickets</Link>
            </li>
            <li className="nav-item">
              <Link to="/payroll" className="nav-link" >Payroll</Link>
            </li>
            {role === 'manager' ? 
            <li className="nav-item">
              {/* Get role of signed in person to set the conditional component to show up if the person's role is manager */}
              <Link to="/employees" className="nav-link">Employees</Link>
            </li> : null}
            <li className="nav-item">
              <Link to="/invoice" className="nav-link" >Invoice</Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" onClick={()=>{dispatch(logOut());}}href="/">Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

// <Link to="/home" className="nav-link active" aria-current="page">Home</Link>

export default Nav;