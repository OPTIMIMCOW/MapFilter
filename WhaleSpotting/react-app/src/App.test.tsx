import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("Renders Home Page", () => {
    render(<App />);
    const linkElement = screen.getByTestId("home");
    expect(linkElement).toBeInTheDocument();
})