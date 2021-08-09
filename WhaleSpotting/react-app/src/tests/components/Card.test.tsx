import React from "react";
import { render, screen } from "@testing-library/react";
import Card from "../../components/Card";
import { SightingApiModel } from "../../api/models/SightingApiModel";
import userEvent from "@testing-library/user-event";

const exampleConfirmed: SightingApiModel = {
    id: 1,
    sightedAt: new Date().toDateString(),
    species: "orca",
    quantity: 3,
    location: "Sea",
    longitude: 1.232,
    latitude: 2.312,
    description: "Whales at sea",
    orcaType: "Orca",
    orcaPod: "",
    confirmed: true,
    userId: 2,
    username: "FakeUserConfirmed"
};

const exampleUnconfirmed: SightingApiModel = {
    id: 2,
    sightedAt: new Date().toDateString(),
    species: "orca",
    quantity: 3,
    location: "Sea",
    longitude: 1.232,
    latitude: 2.312,
    description: "Whales at sea",
    orcaType: "Orca",
    orcaPod: "",
    confirmed: false,
    userId: 2,
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