import React from "react";
import { render, screen } from "@testing-library/react";
import Card from "../components/Card";
import SightingApiModel from "../apiModels/SightingApiModel";

const exampleConfirmed: SightingApiModel = {
    sightedAt: new Date(),
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
    sightedAt: new Date(),
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

describe("Card tests", () => {
    test("Renders card", () => {
        render(<Card sighting={exampleConfirmed}/>);
        const pending = screen.getByTestId("card-component")
        expect(pending).toBeInTheDocument();
    });

    test("Does not render pending for confirmed card", () => {
        render(<Card sighting={exampleConfirmed}/>);
        const pending = screen.getByTestId("confirmed")
        expect(pending).toBeInTheDocument();
    });

    test("Renders pending for unconfirmed card", () => {
        render(<Card sighting={exampleUnconfirmed}/>);
        const pending = screen.getByTestId("pending")
        expect(pending).toBeInTheDocument();
    });
});