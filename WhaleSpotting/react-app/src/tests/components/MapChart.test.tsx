import React from "react";
import { render, screen } from "@testing-library/react";
import MapChart from "../../components/MapChart";
import { BrowserRouter as Router } from "react-router-dom";

describe("Map Chart component tests", () => {
    test("Renders MapChart", () => {
        const chosen = {id: 1, lon: 0, lat: 0};
        function setChosen(){};
        render(<Router><MapChart chosen={chosen} setChosen={setChosen}/></Router>);

        const simpleMap = screen.getByTestId("loading");
        expect(simpleMap).toBeInTheDocument();
    });

});