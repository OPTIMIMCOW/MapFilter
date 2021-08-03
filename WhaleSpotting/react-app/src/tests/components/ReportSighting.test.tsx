import React from "react";
import { render, screen } from "@testing-library/react";
import ReportSighting from "../../components/ReportSighting";

test("Renders Report Sightings page", () => {
    render(<ReportSighting />);
    const title = screen.getByText("Report Your Sighting");
    expect(title).toBeInTheDocument();
});