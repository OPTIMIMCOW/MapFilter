import { GeographyApiModel } from  "./GeographyApiModel"

export interface BatchGeographyApiModel {
    batch: number;
    geography: GeographyApiModel[];
}