import { SightingApiModel } from "./models/SightingApiModel";
import authService from "../components/api-authorization/AuthorizeService";
import { UserApiModel } from "./models/UserApiModel";

export async function fetchPendingSightings(pageNumber: number): Promise<SightingApiModel[]> {
    return await fetch(`api/sightings/pending?page=${pageNumber}&pageSize=10`, {
        headers: await getHeaders() })
        .then(r => r.json());
}

export async function makeAdmin() {
    await fetch("api/User/MakeAdmin", {
        headers: await getHeaders()
    });
}

export async function checkAdmin() {
    const response = await fetch("api/User/CheckAdmin", {
        headers: await getHeaders()
    });

    const regexMatch = /(AccessDenied)/;
    return !response.url.match(regexMatch);
}

export async function removeAdmin() {
    await fetch("api/User/RemoveAdmin", {
        headers: await getHeaders()
    });
}

export async function fetchCurrentUser(): Promise<UserApiModel> {
    const headers = await getHeaders();
    return await fetch("api/user/GetCurrentUser", {
        headers: headers }
    )
        .then(r => r.json());
}

async function getHeaders(): Promise<any> {
    const token = await authService.getAccessToken();
    return !token ? {} : {"Authorization": `Bearer ${token}`};
}
