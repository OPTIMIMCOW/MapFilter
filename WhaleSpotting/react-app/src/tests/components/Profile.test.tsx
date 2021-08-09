import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { Profile } from "../../components/Profile";
import userEvent from "@testing-library/user-event";
import React from "react";
import {SightingApiModel} from "../../api/models/SightingApiModel";
import { fetchPendingSightings } from "../../api/apiClient";

test("renders the Profile information", () => {
    render(
        <Router>
            <Profile />
        </Router>
    );
    const title = screen.getByText("UserName");
    expect(title).toBeInTheDocument();
});

test("renders the Sightings feed", () => {
    render(
        <Router>
            <Profile />
        </Router>
    );
    const title = screen.getByText("Your Sightings");
    expect(title).toBeInTheDocument();
});

test("When approval selected get data from API and change heading to Your Approvals", () => {
    jest.mock("../../api/apiClient", () => ({
        __esModule: true,
        fetchPendingSightings: jest.fn(async (pageNumber: number) : Promise<SightingApiModel[]> => {
            return Promise.resolve([]);
        })
    }));

    render(
        <Router>
            <Profile />
        </Router>
    );
    const approvalButton = screen.getByTestId("approval-toggle");
    userEvent.click(approvalButton);

    setTimeout(()=>{
        expect(fetchPendingSightings).toBeCalled();
    }, 100);

    const title = screen.getByText("Your Approvals");
    expect(title).toBeInTheDocument();
});
