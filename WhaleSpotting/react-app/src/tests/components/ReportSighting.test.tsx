import React from "react";
import { render, screen } from "@testing-library/react";
import { ReportSighting, ShowResultMessage} from "../../components/ReportSighting";

test("Renders Report Sightings page", () => {
    render(<ReportSighting />);
    const title = screen.getByText("Report Your Sighting");
    expect(title).toBeInTheDocument();
});

test("Renders Result Message", () => {
    render(<ShowResultMessage responseMessage="success" />);
    const message = screen.getByTestId("response-result");
    expect(message).toBeInTheDocument();
})