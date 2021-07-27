import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.scss";

export default function Navbar(): JSX.Element {

    return (
        <div className="header">
            <nav className="navbar">
                <div className="group1">
                    <Link to="./Home" data-testid="home" className="navbar-link">Home</Link>
                    <Link to="./Map" className="navbar-link ">Map</Link>
                    <Link to="./ReportSighting" className="navbar-link ">Report Sighting</Link>
                </div>
                <div className="group2">
                    <Link to="./Register" className="navbar-link">Register</Link>
                    <Link to="./Login" className="navbar-link">Login</Link>
                </div>

            </nav>
        </div>
    );
}
