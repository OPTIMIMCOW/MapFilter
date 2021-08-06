import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { Profile } from "../../components/Profile";
import userEvent from "@testing-library/user-event";
import React from "react";
import { Button, Style } from "../../components/Button";

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

test("on click of Approval button and change feed", () => {
    render(
        <Router>
            <Profile />
        </Router>
    );
    const approvalButton = screen.getByTestId("approval-toggle");
    userEvent.click(approvalButton);

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
                forAdmin={true}
                isAdmin={!isUserAdmin}
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
                forAdmin={true}
                isAdmin={isUserAdmin}
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
                forAdmin={true}
                isAdmin={isUserAdmin}
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
                forAdmin={true}
                isAdmin={!isUserAdmin}
                dataTestId="make-admin" />
        </Router>
    );
    const addAdminButton = screen.getByTestId("make-admin");
    expect(addAdminButton).not.toHaveAttribute("hidden");
    // userEvent.click(makeAdminButton);

    render(
        <Router>
            <Button
                style={Style.secondary}
                text="Remove Admin"
                forAdmin={true}
                isAdmin={isUserAdmin}
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
                forAdmin={true}
                isAdmin={isUserAdmin}
                dataTestId="approval-toggle" />
        </Router>
    );
    const approvalsButton = screen.getByTestId("approval-toggle");
    expect(approvalsButton).toHaveAttribute("hidden");
});