import { render, screen } from "@testing-library/react";
import { CreateSightingApiModel, Species, OrcaType } from "../apiModels/CreateSightingApiModel";


test("check species enum works correctly", () => {
    const test = {
        species: Species.AtlanticWhiteSidedDolphin,
        quantity: 2,
        description: "was nice",
        longitude: -100.010,
        latitude: -22.010,
        location: "atlantic ocean",
        sightedAt: Date.now,
        orcaType: null,
        orcaPod: "",
        userId: 5,
    };

    expect(test.species).toBe(1);
});

test("check orcaType nullable enum works correctly", () => {
    const test = {
        species: Species.AtlanticWhiteSidedDolphin,
        quantity: 2,
        description: "was nice",
        longitude: -100.010,
        latitude: -22.010,
        location: "atlantic ocean",
        sightedAt: Date.now,
        orcaType: null,
        orcaPod: "",
        userId: 5,
    };

    expect(test.orcaType).toBe(null);
});

