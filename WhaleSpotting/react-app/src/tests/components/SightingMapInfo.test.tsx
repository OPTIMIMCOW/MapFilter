import React from "react";
import { render, screen } from "@testing-library/react";
import SightingMapInfo from "../../components/SightingMapInfo";
import { BrowserRouter as Router } from "react-router-dom";

describe("Map Chart component tests", () => {
    test("Renders MapChart", () => {
        const chosen = {id: 1, lon: 0, lat: 0};
        render(<Router><SightingMapInfo chosen={chosen}/></Router>);

        const simpleMap = screen.getByTestId("loading");
        expect(simpleMap).toBeInTheDocument();
    });
});
