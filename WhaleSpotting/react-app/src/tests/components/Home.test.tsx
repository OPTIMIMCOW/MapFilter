import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "../../components/Home";
import { BrowserRouter as Router } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { searchSightings } from "../../api/apiClient";
import { SightingApiModel } from "../../api/models/SightingApiModel";
import { OrcaType, Species } from "../../api/ApiEnums";

describe("Home Page tests", () => {
    test("Renders Recent Sightings", () => {
        render(<Router><Home /></Router>);
        const text = screen.getByText("Recent Sightings");
        expect(text).toBeInTheDocument();
    });

    test("Renders Filter button", () => {
        render(<Router><Home /></Router>);
        const filter = screen.getByTestId("filter-button");
        expect(filter).toBeInTheDocument();
    });

    test("Check search form is hidden initially, appears when search button is clicked and hidden when reset button is clicked", () => {
        render(
            <Router>
                <Home />
            </Router>
        );
        const searchForm = screen.getByTestId("search-form");
        expect(searchForm).toHaveAttribute("hidden");

        const filterButton = screen.getByTestId("filter-button");
        userEvent.click(filterButton);
        expect(searchForm).not.toHaveAttribute("hidden");

        const resetButton = screen.getByTestId("reset-button");
        userEvent.click(resetButton);
        expect(searchForm).toHaveAttribute("hidden");
    });

    test("When home renders, it calls API and gets recent sightings", () => {
        const mockexample1: SightingApiModel = {
            id: 1,
            sightedAt: new Date().toDateString(),
            species: Species.Orca,
            quantity: 3,
            location: "Sea",
            longitude: 1.232,
            latitude: 2.312,
            description: "Whales at sea",
            orcaType: OrcaType.Offshore,
            orcaPod: "",
            confirmed: true,
            username: "FakeUserConfirmed"
        };

        const mockexample2: SightingApiModel = {
            id: 2,
            sightedAt: new Date().toDateString(),
            species: Species.Minke,
            quantity: 3,
            location: "Sea",
            longitude: 1.232,
            latitude: 2.312,
            description: "Whales at sea",
            orcaType: null,
            orcaPod: "",
            confirmed: true,
            username: "FakeUserConfirmed"
        };

        const mockSightings = [mockexample1, mockexample2];

        jest.mock("../../api/apiClient", () => ({
            __esModule: true,
            searchSightings: jest.fn(async (): Promise<SightingApiModel[]> => {
                return Promise.resolve(mockSightings);
            })
        }));

        render(
            <Router>
                <Home />
            </Router>
        );

        setTimeout(() => {
            expect(searchSightings).toBeCalled();
        }, 100);

        const submitButton = screen.getByTestId("submit-button");
        userEvent.click(submitButton);

        setTimeout(() => {
            expect(searchSightings).toBeCalled();
        }, 100);
    });
});
