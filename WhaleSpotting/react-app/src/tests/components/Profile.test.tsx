import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { Profile } from "../../components/Profile";
import userEvent from "@testing-library/user-event";
import React from "react";
import { Button, Style } from "../../components/Button";
import {SightingApiModel} from "../../api/models/SightingApiModel";
import { UserApiModel } from "../../api/models/UserApiModel";
import { fetchPendingSightings, fetchCurrentUser } from "../../api/apiClient";

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

test("User is admin, check RemoveAdmin & CheckApprovals do not have hidden attribute and AddAdmin has hidden attribute", () => {
    const isUserAdmin = true;
    render(
        <Router>
            <Button
                style={Style.secondary}
                text="Make Admin"
                hidden={isUserAdmin}
                dataTestId="make-admin" />
        </Router>
    );
    const addAdminButton = screen.getByTestId("make-admin");
    expect(addAdminButton).toHaveAttribute("hidden");

    render(
        <Router>
            <Button
                style={Style.secondary}
                text="Remove Admin"
                hidden={!isUserAdmin}
                dataTestId="remove-admin" />
        </Router>
    );
    const removeAdminButton = screen.getByTestId("remove-admin");
    expect(removeAdminButton).not.toHaveAttribute("hidden");

    render(
        <Router>
            <Button
                style={Style.secondary}
                text="Approvals"
                hidden={!isUserAdmin}
                dataTestId="approval-toggle" />
        </Router>
    );
    const approvalsButton = screen.getByTestId("approval-toggle");
    expect(approvalsButton).not.toHaveAttribute("hidden");
});

test("RemoveAdmin, CheckApprovals should have an attribute hidden and AddAdmin should not if user is not admin", () => {
    const isUserAdmin = false;
    render(
        <Router>
            <Button
                style={Style.secondary}
                text="Make Admin"
                hidden={isUserAdmin}
                dataTestId="make-admin" />
        </Router>
    );
    const addAdminButton = screen.getByTestId("make-admin");
    expect(addAdminButton).not.toHaveAttribute("hidden");

    render(
        <Router>
            <Button
                style={Style.secondary}
                text="Remove Admin"
                hidden={!isUserAdmin}
                dataTestId="remove-admin" />
        </Router>
    );
    const removeAdminButton = screen.getByTestId("remove-admin");
    expect(removeAdminButton).toHaveAttribute("hidden");

    render(
        <Router>
            <Button
                style={Style.secondary}
                text="Approvals"
                hidden={!isUserAdmin}
                dataTestId="approval-toggle" />
        </Router>
    );
    const approvalsButton = screen.getByTestId("approval-toggle");
    expect(approvalsButton).toHaveAttribute("hidden");
});

test("When profile renders, it calls API and gets current user", () => {
    const user: UserApiModel = {
        username: "test"
    }
    
    jest.mock("../../api/apiClient", () => ({
        __esModule: true,
        fetchCurrentUser: jest.fn(async () : Promise<UserApiModel> => {
            return Promise.resolve(user);
        })
    }));

    render(
        <Router>
            <Profile />
        </Router>
    );
    
    setTimeout(()=>{
        expect(fetchCurrentUser).toBeCalled();
    }, 100);
});