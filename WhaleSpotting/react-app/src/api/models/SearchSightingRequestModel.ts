export interface SearchSightingRequestModel {
    species?: string;
    location?: string;
    longitude?: number | null;
    latitude?: number | null;
    sightedFrom?: Date | null;
    sightedTo?: Date | null;
    orcaType?: string;
    orcaPod?: string;
    confirmed?: boolean | null;
}