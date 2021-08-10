import { SightingApiModel } from "./SightingApiModel";

export interface UserApiModel {
    username: string;
    sightings: SightingApiModel[];
}