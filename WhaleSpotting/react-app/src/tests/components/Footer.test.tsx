import { render, screen } from "@testing-library/react";
import { Footer } from "../../components/Footer";
import React from "react";

test("renders Whale Museum logo in footer", () => {
    render(<Footer />);

    const whaleMuseumLogo = screen.getByTestId("whale-museum-logo") as HTMLImageElement;

    expect(whaleMuseumLogo).toBeInTheDocument();
    expect(whaleMuseumLogo.src).toBe("https://cdn.shopify.com/s/files/1/0249/1083/t/3/assets/wm-logo-sm.png");
});

test("renders TechSwitch logo in footer", () => {
    render(<Footer />);

    const techSwitchLogo = screen.getByTestId("techswitch-logo") as HTMLImageElement;

    expect(techSwitchLogo).toBeInTheDocument();
    expect(techSwitchLogo.src).toBe("https://www.techswitch.co.uk/images/logo.svg");
});