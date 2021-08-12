import { Species, OrcaType } from "../ApiEnums";

export interface SearchSightingRequestModel {
    species?: Species | null;
    location?: string;
    longitude?: number | null;
    latitude?: number | null;
    sightedFrom?: Date | null;
    sightedTo?: Date | null;
    orcaType?: OrcaType | null;
    orcaPod?: string;
    radiusKm?: number;
    confirmed?: boolean;
}