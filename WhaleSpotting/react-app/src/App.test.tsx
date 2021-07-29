import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("Renders Home Page", () => {
    render(<App />);
    const header = screen.getByText("Recent Sightings");
    expect(header).toBeInTheDocument();
});