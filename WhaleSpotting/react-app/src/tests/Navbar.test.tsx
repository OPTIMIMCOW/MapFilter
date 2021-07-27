import React from "react";
import { render, screen } from "@testing-library/react";
import Navbar from "../components/Navbar";
import { BrowserRouter as Router } from "react-router-dom";

test("renders navbar", () => {
    render(<Router><Navbar /></Router>);
    const home = screen.getByTestId("home");
    expect(home).toBeInTheDocument(); 
});