import { SightingApiModel } from  "./SightingApiModel"

export interface BatchSightingApiModel {
    batch: number;
    sightings: SightingApiModel[];
}