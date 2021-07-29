import { render, screen } from "@testing-library/react";
import { Footer } from "../components/Footer";
import React from "react";

test("renders Whale Museum logo in footer", () => {
    render(<Footer />);

    const whaleMuseumLogo = screen.getByTestId("whale-museum-logo");

    expect(whaleMuseumLogo).toBeInTheDocument();
    expect(whaleMuseumLogo.src === "https://cdn.shopify.com/s/files/1/0249/1083/t/3/assets/wm-logo-sm.png").toBeTruthy();
});

test("renders TechSwitch logo in footer", () => {
    render(<Footer />);

    const techSwitchLogo = screen.getByTestId("techswitch-logo");

    expect(techSwitchLogo).toBeInTheDocument();
    expect(techSwitchLogo.src === "https://www.techswitch.co.uk/images/logo.svg").toBeTruthy();
});