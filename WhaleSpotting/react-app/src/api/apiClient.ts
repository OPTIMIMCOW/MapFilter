import React from "react";
import { SightingApiModel } from "./models/SightingApiModel";

export async function fetchPendingSightings(): Promise<SightingApiModel[]> {
    return await fetch("https://localhost:5001/api/sightings/pending?page=1&pageSize=10")
        .then(r => r.json());
}