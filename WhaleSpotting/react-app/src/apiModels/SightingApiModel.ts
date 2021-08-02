interface SightingApiModel {
    sightedAt: Date;
    species: string;
    quantity: number;
    location: string;
    longitude: number;
    latitude: number;
    description: string;
    orcaType: string;
    orcaPod: string;
    confirmed: boolean;
    userId: number;
    username: string;
}

export default SightingApiModel;