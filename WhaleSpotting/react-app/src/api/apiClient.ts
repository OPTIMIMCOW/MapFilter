import { SightingApiModel } from "./models/SightingApiModel";
import authService from "../components/api-authorization/AuthorizeService";

export async function fetchPendingSightings(pageNumber: number): Promise<SightingApiModel[]> {
    const token = await authService.getAccessToken();
    return await fetch(`https://localhost:5001/api/sightings/pending?page=${pageNumber}&pageSize=10`, {
        headers: !token ? {} : { "Authorization": `Bearer ${token}` }
    })
        .then(r => r.json());
}