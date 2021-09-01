/*eslint-disable*/
import "../styles/Map.scss";
import "../styles/Home.scss";
import React, { useState } from "react";
import { MapChart } from "./MapChart";
import SightingMapInfo from "./SightingMapInfo";
import { BannerImage } from "./BannerImage";
import { AttractionType } from "../api/ApiEnums"

export interface Chosen {
    id: number,
    lat: number,
    lon: number
}

export default function Map(): JSX.Element {

    const [chosen, setChosen] = useState<Chosen>();
    const [clicked, setClicked] = useState<number>(0);
    const [variable1, setVariable1] = useState<number | null>();
    const [variable2, setVariable2] = useState<number>();
    const [distVar2, setDistVar2] = useState<number | null>(null);
    const [variable3, setVariable3] = useState<number>();
    const [distVar3, setDistVar3] = useState<number>();


    return (
        <div className="map-component-container">
            <BannerImage />
            <div>
                <label>Attraction Type 1</label>
                <select className="input-field" onChange={(e) => { setVariable1(parseInt(e.target.value)); }} defaultValue={"NA"}>
                    <option value={AttractionType.Beach}> {AttractionType.Beach.toString}</option>,
                    <option value={AttractionType.Hiking}> {AttractionType.Hiking.toString}</option>,
                    <option value={AttractionType.History}> {AttractionType.History.toString}</option>,
                    <option value={AttractionType.Fishing}> {AttractionType.Fishing.toString}</option>,
                </select>
            </div>
            <div>
                <label>Attraction Type 2</label>
                <select className="input-field" onChange={(e) => { setVariable2(parseInt(e.target.value)); }} defaultValue={"NA"}>
                    <option value={AttractionType.Beach}> {AttractionType.Beach.toString}</option>,
                    <option value={AttractionType.Hiking}> {AttractionType.Hiking.toString}</option>,
                    <option value={AttractionType.History}> {AttractionType.History.toString}</option>,
                    <option value={AttractionType.Fishing}> {AttractionType.Fishing.toString}</option>,
                </select>
                <label>Distance From Variable 1</label>
                <select className="input-field" onChange={(e) => { setDistVar2(parseInt(e.target.value)); }} defaultValue={""}>
                    <option value={10}> 10km</option>,
                    <option value={50}> 0km</option>,
                    <option value={100}> 100km</option>,
                    <option value={500}> 500km</option>,
                </select>
            </div>

            <button onClick={() => setClicked(clicked + 1)}>Click to Re-Run</button>
            <div className="map-component" data-testid="map-component">
                <h2 className="map-header">Map Filter</h2>
                <div className="map-container" data-testid="map-container">
                    <MapChart chosen={chosen} setChosen={setChosen} clicked={clicked} />
                </div>
                <div className="map-info" data-testid="map-info">
                    <SightingMapInfo chosen={chosen} />
                </div>
            </div>
        </div>
    );
}