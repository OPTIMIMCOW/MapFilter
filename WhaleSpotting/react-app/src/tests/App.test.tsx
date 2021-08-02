import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";
import { BrowserRouter as Router } from "react-router-dom";

test("Renders Home Page", () => {
    render(<Router><App /></Router>);
    const header = screen.getByText("Recent Sightings");
    expect(header).toBeInTheDocument();
});
