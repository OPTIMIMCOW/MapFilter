import React from "react";
import { render, screen } from "@testing-library/react";
import { BannerImage } from "../components/BannerImage";

test("Renders banner image", () => {
    render(<BannerImage/>);
    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("src", "https://ssl.tzoo-img.com/images/tzoo.1.0.685904.shutterstock_567677317.jpg");
});