import React from "react";
import { render, screen } from "@testing-library/react";
import { MapChart } from "../../components/MapChart";
import { BrowserRouter as Router } from "react-router-dom";
import { SightingApiModel } from "../../api/models/SightingApiModel";
import { fetchAllSightings } from "../../api/apiClient";
import { OrcaType, Species } from "../../api/ApiEnums";

const mockexample: SightingApiModel = {
    id: 1,
    sightedAt: new Date().toDateString(),
    species: Species.Orca,
    quantity: 3,
    location: "Sea",
    longitude: 1.232,
    latitude: 2.312,
    description: "Whales at sea",
    orcaType: OrcaType.NorthernResident,
    orcaPod: "",
    confirmed: true,
    username: "FakeUserConfirmed"
};

describe("Map Chart component tests", () => {
    test("Renders MapChart", () => {

        jest.mock("../../api/apiClient", () => ({
            __esModule: true,
            fetchAllSightings: jest.fn(async () : Promise<SightingApiModel[]> => {
                return Promise.resolve([mockexample]);
            })
        }));

        //eslint-disable-next-line
        render(<Router><MapChart chosen={undefined} setChosen={() => {}}/></Router>);

        setTimeout(()=>{
            expect(fetchAllSightings).toBeCalled();
        }, 100);

        setTimeout(()=> {
            const simpleMap = screen.getByTestId("simple-map");
            expect(simpleMap).toBeInTheDocument();
        }, 200);
    });
});