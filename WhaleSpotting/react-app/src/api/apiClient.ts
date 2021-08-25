import { SightingApiModel } from "./models/SightingApiModel";
import authService from "../components/api-authorization/AuthorizeService";
import { CreateSightingApiModel } from "./models/CreateSightingApiModel";
import { SearchSightingRequestModel } from "./models/SearchSightingRequestModel";
import { UserApiModel } from "./models/UserApiModel";
import { Species } from "./ApiEnums";
import { BatchSightingRequestModel } from "./models/BatchSightingRequestModel";

export async function fetchAllSightings(): Promise<SightingApiModel[]> {
    return await fetch("api/sightings", await getGetSettings())
        .then(r => r.json());
}

export async function fetchBatchSightings(request: BatchSightingRequestModel): Promise<SightingApiModel[]> {
    return await fetch(`api/sightings/batch?maxLatitude=${request.maxLatitude}&minLatitude=${request.minLatitude}&batchNumber=${request.batchNumber}`, await getGetSettings())
        .then(r => r.json());
}

export async function fetchPendingSightings(pageNumber: number): Promise<SightingApiModel[]> {
    return await fetch(`api/sightings/pending?pageNumber=${pageNumber}&pageSize=10`, await getGetSettings())
        .then(r => r.json());
}

export async function makeAdmin(): Promise<void> {
    await fetch("api/User/MakeAdmin", await getGetSettings());
}

export async function checkAdmin(): Promise<boolean> {
    const response = await fetch("api/User/CheckAdmin", await getGetSettings());

    const regexMatch = /(AccessDenied)/;
    return !response.url.match(regexMatch);
}

export async function removeAdmin(): Promise<void> {
    await fetch("api/User/RemoveAdmin", await getGetSettings());
}

export async function createSighting(sighting: CreateSightingApiModel): Promise<Response> {
    return await fetch("api/sightings/create", await getPostSettings(sighting));
}

export async function confirmSighting(id: number): Promise<SightingApiModel> {
    return await fetch(`api/sightings/${id}/confirm`, await getPutSettings())
        .then(r => r.json());
}

export async function deleteSighting(id: number): Promise<SightingApiModel> {
    return await fetch(`api/sightings/${id}/reject`, await getDeleteSettings())
        .then(r => r.json());
}

export async function fetchCurrentUser(): Promise<UserApiModel> {
    return await fetch("api/user/GetCurrentUser", await getGetSettings())
        .then(r => r.json());
}

export async function searchSightings(search: SearchSightingRequestModel, pageNumber = 1, pageSize = 10): Promise<SightingApiModel[]> {
    const searchParams: string[] = [];
    if (search.species){
        searchParams.push("species=" + search.species);
    }
    if (search.longitude){
        searchParams.push("longitude=" + search.longitude);
    }
    if (search.latitude){
        searchParams.push("latitude=" + search.latitude);
    }
    if (search.location){
        searchParams.push("location=" + search.location);
    }
    if (search.sightedFrom){
        searchParams.push("sightedFrom=" + search.sightedFrom.toJSON());
    }
    if (search.sightedTo){
        searchParams.push("sightedTo=" + search.sightedTo.toJSON());
    }
    if (search.orcaType){
        searchParams.push("orcaType=" + search.orcaType);
    }
    if (search.orcaPod){
        searchParams.push("orcaPod=" + search.orcaPod);
    }
    if (search.radiusKm){
        searchParams.push("radiusKm=" + search.radiusKm);
    }
    if (search.confirmed) {
        searchParams.push("confirmed=" + search.confirmed);
    }
    if (pageNumber){
        searchParams.push("pageNumber=" + pageNumber);
    }
    if (pageSize){
        searchParams.push("pageSize=" + pageSize);
    }
    return await fetch("api/sightings/search?" + searchParams.join("&"), await getGetSettings())
        .then(r => r.status === 404 || r.status === 400 ? [] : r.json());
}

export async function fetchCurrentUserSightings(pageNumber: number): Promise<SightingApiModel[]> {
    return await fetch(`api/sightings/current?pageNumber=${pageNumber}&pageSize=10`, await getGetSettings())
        .then(r => r.json());
}

export async function fetchSpecies(lon: number, lat: number): Promise<Species[]> {
    return await fetch(`api/sightings/LocalSpecies?longitude=${lon}&latitude=${lat}`)
        .then(response => response.json());
}

async function getPostSettings(apiModel: CreateSightingApiModel): Promise<RequestInit> {
    const token = await authService.getAccessToken();
    return {
        method: "POST",
        headers: !token ? {}
            : {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        body: JSON.stringify(apiModel),
    };
}

async function getGetSettings(): Promise<RequestInit> {
    const token = await authService.getAccessToken();
    return {
        headers: !token ? {} : { "Authorization": `Bearer ${token}` }
    };
}


async function getPutSettings(): Promise<RequestInit> {
    const token = await authService.getAccessToken();
    return {
        method: "PUT",
        headers: !token ? {} : { "Authorization": `Bearer ${token}` }
    };
}

async function getDeleteSettings(): Promise<RequestInit> {
    const token = await authService.getAccessToken();
    return {
        method: "DELETE",
        headers: !token ? {} : { "Authorization": `Bearer ${token}` }
    };
}
