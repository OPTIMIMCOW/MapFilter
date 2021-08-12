import { Species, OrcaType } from "../ApiEnums";

export interface SightingApiModel {
    id: number;
    sightedAt: string;
    species: Species;
    quantity: number;
    location: string;
    longitude: number;
    latitude: number;
    description: string;
    orcaType: OrcaType | null;
    orcaPod: string;
    confirmed: boolean;
    username: string;
}