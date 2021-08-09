import { SightingApiModel } from "./models/SightingApiModel";
import authService from "../components/api-authorization/AuthorizeService";

export async function fetchPendingSightings(pageNumber: number): Promise<SightingApiModel[]> {
    const token = await authService.getAccessToken();
    return await fetch(`https://localhost:5001/api/sightings/pending?page=${pageNumber}&pageSize=10`, {
        headers: !token ? {} : { "Authorization": `Bearer ${token}` }
    })
        .then(r => r.json());
}
import authService from "../components/api-authorization/AuthorizeService";

export async function makeAdmin() {
    const headers = await getHeaders();
    const response = await fetch("User/MakeAdmin", {
        headers: headers
    });
}

export async function checkAdmin() {
    const headers = await getHeaders();
    const response = await fetch("User/CheckAdmin", {
        headers: headers
    });

    const regexMatch = /(AccessDenied)/;
    return !response.url.match(regexMatch);
}

export async function removeAdmin() {
    const headers = await getHeaders();
    const response = await fetch("User/RemoveAdmin", {
        headers: headers
    });
}

async function getHeaders(): Promise<any> {
    const token = await authService.getAccessToken();
    return !token ? {} : {"Authorization": `Bearer ${token}`};
}