import { Species, OrcaType } from "./ApiEnums";

export interface CreateSightingApiModel {
    species: Species;
    quantity: number;
    description: string;
    longitude: number;
    latitude: number;
    location: string;
    sightedAt: Date;
    orcaType: OrcaType | null;
    orcaPod: string;
    userId: number;
}
