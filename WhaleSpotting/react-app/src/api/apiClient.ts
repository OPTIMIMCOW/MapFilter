import authService from "../components/api-authorization/AuthorizeService";

export async function makeAdmin() {
    const token = await authService.getAccessToken();
    const response = await fetch("User/MakeAdmin", {
        headers: !token ? {} : { "Authorization": `Bearer ${token}` }
    });
    //eslint-disable-next-line
    console.log(response);
}
export async function checkAdmin() {
    const token = await authService.getAccessToken();
    const response = await fetch("User/CheckAdmin", {
        headers: !token ? {} : { "Authorization": `Bearer ${token}` }
    });
    //eslint-disable-next-line
    console.log(response);
}
export async function removeAdmin() {
    const token = await authService.getAccessToken();
    const response = await fetch("User/RemoveAdmin", {
        headers: !token ? {} : { "Authorization": `Bearer ${token}` }
    });
    //eslint-disable-next-line
    console.log(response);
}