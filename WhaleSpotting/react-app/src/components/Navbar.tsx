import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/Navbar.scss";

export default function Navbar(): JSX.Element {
    const location = useLocation();
    const removeSlash = location.pathname.slice(1);
    const pageName = removeSlash === "" ? "Home" : removeSlash.substr(0, 1).toUpperCase() + removeSlash.substr(1).toLowerCase();
    const [currentPage, setCurrentPage] = useState(pageName);

    function HandleLinkClick(currentPage: string) {
        setCurrentPage(currentPage);
    }
    const loggedIn = false;

    useEffect(() => {
        setCurrentPage(pageName);
    }, [location]);
    return (
        <div className="header">
            <nav className="nav-bar">
                <div className="fixed-nav-links">
                    <Link to="./Home" data-testid="home"
                        className={currentPage === "Home" ? "navbar-link selected" : "navbar-link"}
                        onClick={() => HandleLinkClick("Home")}>Home</Link>
                    <Link to="./Map"
                        className={currentPage === "Map" ? "navbar-link selected" : "navbar-link"}
                        onClick={() => HandleLinkClick("Map")}>Map</Link>
                    <Link to="./Reportsighting"
                        className={currentPage === "Reportsighting" ? "navbar-link selected" : "navbar-link"}
                        onClick={() => HandleLinkClick("Reportsighting")}>Report Sighting</Link>
                </div>
                <div className="changing-nav-links">
                    <div className={(!loggedIn) ? "display" : "dontdisplay"}>
                        <Link to="./Register"
                            className={currentPage === "Register" ? "navbar-link selected" : "navbar-link"}
                            onClick={() => HandleLinkClick("Register")} >Register</Link>
                        <Link to="./Login"
                            className={currentPage === "Login" ? "navbar-link selected" : "navbar-link"}
                            onClick={() => HandleLinkClick("Login")}>Login</Link>
                    </div>
                    <div className={(loggedIn) ? "display" : "dontdisplay"}>
                        <Link to="./Profile"
                            className={currentPage === "Profile" ? "navbar-link selected" : "navbar-link"}
                            onClick={() => HandleLinkClick("Profile")}>Profile</Link>
                        <Link to="./Logout"
                            className={currentPage === "Logout" ? "navbar-link selected" : "navbar-link"}
                            onClick={() => HandleLinkClick("Logout")}>Log Out</Link>
                    </div>
                </div>
            </nav>
        </div>
    );
}
