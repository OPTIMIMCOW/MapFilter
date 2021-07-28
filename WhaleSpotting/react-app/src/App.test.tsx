import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("Renders Home Page", () => {
    render(<App />);
    const home = screen.getByTestId("home");
    expect(home).toBeInTheDocument();
});