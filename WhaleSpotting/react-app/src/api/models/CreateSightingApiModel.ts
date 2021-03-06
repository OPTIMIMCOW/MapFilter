import { Species, OrcaType } from "../ApiEnums";

export interface CreateSightingApiModel {
    species: Species;
    quantity: number;
    description: string;
    longitude: number | null;
    latitude: number | null;
    location: string;
    sightedAt: Date;
    orcaType: OrcaType | null;
    orcaPod: string;
}
