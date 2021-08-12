import React from "react";
import { render, screen } from "@testing-library/react";
import Card from "../../components/Card";
import { SightingApiModel } from "../../api/models/SightingApiModel";
import userEvent from "@testing-library/user-event";
import { confirmSighting } from "../../api/apiClient";
import { OrcaType, Species } from "../../api/ApiEnums";

const exampleConfirmed: SightingApiModel = {
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

const exampleUnconfirmed: SightingApiModel = {
    id: 2,
    sightedAt: new Date().toDateString(),
    species: Species.Orca,
    quantity: 3,
    location: "Sea",
    longitude: 1.232,
    latitude: 2.312,
    description: "Whales at sea",
    orcaType: OrcaType.Offshore,
    orcaPod: "",
    confirmed: false,
    username: "FakeUserNotConfirmed"
};

test("Renders card", () => {
    render(<Card sighting={exampleConfirmed} />);
    const cardComponent = screen.getByTestId("card-component");
    expect(cardComponent).toBeInTheDocument();
});

test("Does not render pending for confirmed card", () => {
    render(<Card sighting={exampleConfirmed} />);
    const pending = screen.queryByTestId("pending");
    expect(pending).toBeNull();
});

test("Renders pending for unconfirmed card", () => {
    render(<Card sighting={exampleUnconfirmed} />);
    const pending = screen.getByTestId("pending");
    expect(pending).toBeInTheDocument();
});

test("On click the class changes to open", () => {
    render(<Card sighting={exampleUnconfirmed} />);
    const card = screen.getByTestId("card");
    const secondCol = screen.getByTestId("second-column");
    userEvent.click(card);
    expect(secondCol).toHaveClass("open");
});

test("On approve the card class changes to hidden", () => {
    render(<Card sighting={exampleUnconfirmed} admin={true} />);
    const card = screen.getByTestId("sighting-card");
    const approveButton = screen.getByTestId("approve-button");
    userEvent.click(approveButton);
    expect(card).toHaveAttribute("hidden");
});

test("On click of approve confirmSighting API is called", () => {
    const mockSighting: SightingApiModel = {
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
        confirmed: false,
        username: "FakeUserConfirmed"
    };

    jest.mock("../../api/apiClient", () => ({
        __esModule: true,
        confirmSighting: jest.fn(async (id: number): Promise<SightingApiModel> => {
            return Promise.resolve(mockSighting);
        })
    }));

    render(<Card sighting={mockSighting} admin={true} />);

    const approveButton = screen.getByTestId("approve-button");
    userEvent.click(approveButton);

    setTimeout(() => {
        expect(confirmSighting).toBeCalled();
    }, 100);
    
});