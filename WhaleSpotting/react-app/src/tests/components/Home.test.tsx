import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "../../components/Home";

describe("Home Page tests", () => {
    test("Renders Recent Sightings", () => {
        render(<Home />);
        const text = screen.getByText("Recent Sightings");
        expect(text).toBeInTheDocument();
    });

    test("Renders Filter button", () => {
        render(<Home />);
        const filter = screen.getByTestId("filter-button");
        expect(filter).toBeInTheDocument();
    });
});