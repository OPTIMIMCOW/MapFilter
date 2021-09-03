import { IUserInput } from "../../components/Map";

export interface BatchGeographyRequestModel {
    maxLatitude: number;
    minLatitude: number;
    maxLongitude: number;
    minLongitude: number;
    batchNumber: number;
    userInput: IUserInput;
}