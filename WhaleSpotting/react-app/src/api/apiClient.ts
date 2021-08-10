import { SightingApiModel } from "./models/SightingApiModel";
import authService from "../components/api-authorization/AuthorizeService";
import { CreateSightingApiModel } from "./models/CreateSightingApiModel";
import { SearchSightingRequestModel } from "./models/SearchSightingRequestModel";

export async function fetchPendingSightings(pageNumber: number): Promise<SightingApiModel[]> {
    return await fetch(`api/sightings/pending?page=${pageNumber}&pageSize=10`, await getGetSettings())
        .then(r => r.json());
}

export async function makeAdmin() {
    await fetch("api/User/MakeAdmin", await getGetSettings());
}

export async function checkAdmin() {
    const response = await fetch("api/User/CheckAdmin", await getGetSettings());

    const regexMatch = /(AccessDenied)/;
    return !response.url.match(regexMatch);
}

export async function removeAdmin() {
    await fetch("api/User/RemoveAdmin", await getGetSettings());
}

export async function createSighting(sighting: CreateSightingApiModel): Promise<any> {
    return await fetch("api/sightings/create", await getPostSettings(sighting));
}

async function getPostSettings(apiModel: any): Promise<any> {
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

async function getGetSettings(): Promise<any> {
    const token = await authService.getAccessToken();
    return {
        headers: !token ? {} : { "Authorization": `Bearer ${token}` }
    };
}

export async function getConfirmedSightings(search: SearchSightingRequestModel, pageNumber=1, pageSize=10) {
    //search = {Key: value, Key: Value}
    return await fetch(`sighting/search?
        ${search.species ? "species=" + search.species : ""}
        ${search.longitude ? "&longitude=" + search.longitude : ""}
        ${search.latitude ? "&latitude=" + search.latitude : ""}
        ${search.location ? "&location=" + search.location : ""}
        ${search.sightedFrom ? "&sightedFrom=" + search.sightedFrom : ""}
        ${search.sightedTo ? "&sightedTo=" + search.sightedTo : ""}
        ${search.orcaType ? "&orcaType=" + search.orcaType : ""}
        ${search.orcaPod ? "&orcaPod=" + search.orcaPod : ""}
        ${search.confirmed ? "&confirmed=" + search.confirmed : ""}
        ${pageNumber ? "&pageNumber=" + pageNumber : ""}
        ${pageSize ? "&pageSize=" + pageSize : ""}
    `, await getGetSettings());
}
