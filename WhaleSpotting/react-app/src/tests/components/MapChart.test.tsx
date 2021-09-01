import React from "react";
import { render, screen } from "@testing-library/react";
import { MapChart } from "../../components/MapChart";
import { BrowserRouter as Router } from "react-router-dom";
import { BatchGeographyApiModel } from "../../api/models/BatchGeographyApiModel";
import { fetchBatchGeography } from "../../api/apiClient";
import { AttractionType } from "../../api/ApiEnums";

//const mockexample: BatchGeographyApiModel = {
//    batch: 1,
//    geography: [
//        {
//            id: 1,
//            longitude: 1,
//            latitude: 1,
//            type: AttractionType.Beach
//        },
//        {
//            id: 2,
//            longitude: 1,
//            latitude: 1,
//            type: AttractionType.Hiking
//        }
//    ]
//};

//describe("Map Chart component tests", () => {
//    //test("Renders MapChart", () => {

//    //    jest.mock("../../api/apiClient", () => ({
//    //        __esModule: true,
//    //        fetchBatchGeography: jest.fn(async (): Promise<BatchGeographyApiModel> => {
//    //            return Promise.resolve(mockexample);
//    //        })
//    //    }));
//    //    var chosenVal = { id: 1, lon: 1, lat: 1 }
//    //    var request = {
//    //        maxLatitude: 90,
//    //        minLatitude: -90,
//    //        batchNumber: 10
//    //    }

//    //    //eslint-disable-next-line
//    //    render(<MapChart chosen={chosenVal} setChosen={() => { }} clicked={1} />);

//    //    setTimeout(() => {
//    //        expect(fetchBatchGeography(request)).toBeCalled();
//    //    }, 100);

//    //    setTimeout(() => {
//    //        const simpleMap = screen.getByTestId("simple-map");
//    //        expect(simpleMap).toBeInTheDocument();
//    //    }, 200);
//    //});
//});