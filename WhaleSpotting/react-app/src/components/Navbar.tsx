import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/Navbar.scss";
import authService from "./api-authorization/AuthorizeService";

export default function Navbar(): JSX.Element {
    const location = useLocation();
    const removeSlash = location.pathname.slice(1);
    const pageName = removeSlash === "" ? "Home" : removeSlash.substr(0, 1).toUpperCase() + removeSlash.substr(1).toLowerCase();
    const [currentPage, setCurrentPage] = useState(pageName);
    const [closeBurger, setBurgerState] = useState(true);
    const ref = useRef<HTMLDivElement>(null);
    useOnClickOutside(ref, () => { setBurgerState(true); });
    const [loggedIn, setLoggedIn] = useState(false);
    useEffect(() => {
        setCurrentPage(pageName);
        authService.isAuthenticated().then(isAuthenticated => setLoggedIn(isAuthenticated));
    }, [location]);

    function HandleLinkClick(currentPage: string) {
        setCurrentPage(currentPage);
        setBurgerState(true);
    }

    function CheckCurrentPage(pageName: string) {
        return currentPage === pageName ? "navbar-link selected" : "navbar-link";
    }

    return (
        <div className="header" ref={ref}>
            <nav className={closeBurger ? "nav-bar" : "nav-bar-mobile"}>
                <div className="fixed-nav-links">
                    <Link to="/Home" data-testid="home-link-navbar"
                        className={CheckCurrentPage("Home")}
                        onClick={() => HandleLinkClick("Home")}>Home</Link>
                    <Link to="/Map"
                        className={CheckCurrentPage("Map")}
                        onClick={() => HandleLinkClick("Map")}>Map</Link>
                    <Link to="/Reportsighting"
                        className={CheckCurrentPage("Reportsighting")}
                        onClick={() => HandleLinkClick("Reportsighting")}>Report Sighting</Link>
                </div>
                <div className="changing-nav-links">
                    <div hidden={loggedIn} >
                        <div className="changing-nav-links-mobile">
                            <Link to="/register"
                                className={CheckCurrentPage("Register")}
                                onClick={() => HandleLinkClick("Register")}>Register</Link>
                            <Link to="/login"
                                className={CheckCurrentPage("Login")}
                                onClick={() => HandleLinkClick("Login")}>Login</Link>
                        </div>
                    </div>
                    <div hidden={!loggedIn}>
                        <div className="changing-nav-links-mobile">
                            <Link to="/Profile"
                                className={CheckCurrentPage("Profile")}
                                onClick={() => HandleLinkClick("Profile")}>Profile</Link>
                            <Link to="/logout"
                                className={CheckCurrentPage("Logout")}
                                onClick={() => HandleLinkClick("Logout")}>Log Out</Link>
                        </div>
                    </div>
                </div>
            </nav>
            <div className={closeBurger ? "current-page-mobile" : "nav-bar"}>{currentPage === "Reportsighting" ? "Report Sighting" : currentPage}</div>
            <div className="burger-button"
                onClick={() => setBurgerState(!closeBurger)}>
                <div className={closeBurger ? "opened-bar-1" : "closed-bar-1"}></div>
                <div className={closeBurger ? "opened-bar-2" : "closed-bar-2"}></div>
                <div className={closeBurger ? "opened-bar-3" : "closed-bar-3"}></div>
            </div>
        </div>
    );
}

function useOnClickOutside(ref: React.RefObject<HTMLDivElement>, handler: () => void) {
    useEffect(() => {
        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);

        return () => {
            document.removeEventListener("mousedown", listener);
            document.removeEventListener("touchstart", listener);
        };
    }, [ref, handler]);

    function listener(this: Document, ev: MouseEvent | TouchEvent): void {
        if (!ref.current || ref.current.contains(ev.target as Node)) {
            return;
        }
        handler();
    }
}
