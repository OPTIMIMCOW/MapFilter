import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BannerImage } from "../components/BannerImage";
import { BrowserRouter as Router } from "react-router-dom";

test("Renders banner image", () => {
    render(<Router><BannerImage/></Router>);
    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("src", "https://ssl.tzoo-img.com/images/tzoo.1.0.685904.shutterstock_567677317.jpg");
});