import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "../../components/Home";
import { BrowserRouter as Router } from "react-router-dom";

describe("Home Page tests", () => {
    test("Renders Recent Sightings", () => {
        render(<Router><Home /></Router>);
        const text = screen.getByText("Recent Sightings");
        expect(text).toBeInTheDocument();
    });

    test("Renders Filter button", () => {
        render(<Router><Home /></Router>);
        const filter = screen.getByTestId("filter-button");
        expect(filter).toBeInTheDocument();
    });
});