/*eslint-disable*/
import "../styles/Map.scss";
import "../styles/Home.scss";
import React, { useEffect, useState } from "react";
import { MapChart } from "./MapChart";
import SightingMapInfo from "./SightingMapInfo";
import { BannerImage } from "./BannerImage";
import { AttractionType } from "../api/ApiEnums"

export interface Chosen {
    id: number,
    lat: number,
    lon: number
}

export interface IUserInput {
    attr1: AttractionType | null,
    attr2: AttractionType | null,
    dist12: number | null,
}

export default function Map(): JSX.Element {

    const [chosen, setChosen] = useState<Chosen>();
    const [clicked, setClicked] = useState<number>(0);
    const [variable1, setVariable1] = useState<AttractionType | null>(null);
    const [variable2, setVariable2] = useState<AttractionType | null>(null);
    const [distVar2, setDistVar2] = useState<number | null>(null);
    const [variable3, setVariable3] = useState<AttractionType | null>(null);
    const [distVar3, setDistVar3] = useState<number | null>(null);
    const [userInput, setUserInput] = useState<IUserInput | null>(null);

    useEffect(() => {
        setUserInput({
            attr1: variable1,
            attr2: variable2,
            dist12: distVar2,
        })
    }, [variable1, variable2, distVar2])

    return (
        <div className="map-component-container">
            <BannerImage />
            <h2 className="map-header">Map Filter</h2>
            <div className="sector-holder">
                <div className="attribute-group">
                    <label>Attraction Type 1</label>
                    <select className="input-field" onChange={(e) => { setVariable1(parseInt(e.target.value)); }} defaultValue={undefined}>
                    <option value={AttractionType.Beach}> {AttractionType[AttractionType["Beach"]]}</option>,
                    <option value={AttractionType.Hiking}> {AttractionType[AttractionType["Hiking"]]}</option>,
                    <option value={AttractionType.History}> {AttractionType[AttractionType["History"]]}</option>,
                    <option value={AttractionType.Fishing}> {AttractionType[AttractionType["Fishing"]]}</option>,
                    </select>
                </div>
                <div className="attribute-group">
                    <label>Attraction Type 2</label>
                    <select className="input-field" onChange={(e) => { setVariable2(parseInt(e.target.value)); }} defaultValue={undefined}>
                    <option value={AttractionType.Beach}> {AttractionType[AttractionType["Beach"]]}</option>,
                    <option value={AttractionType.Hiking}> {AttractionType[AttractionType["Hiking"]]}</option>,
                    <option value={AttractionType.History}> {AttractionType[AttractionType["History"]]}</option>,
                    <option value={AttractionType.Fishing}> {AttractionType[AttractionType["Fishing"]]}</option>,
                    </select>
                    <label>Distance From Variable 1</label>
                    <select className="input-field" onChange={(e) => { setDistVar2(parseInt(e.target.value)); }} defaultValue={undefined}>
                    <option value={10}> 10km</option>,
                    <option value={50}> 50km</option>,
                    <option value={100}> 100km</option>,
                    <option value={500}> 500km</option>,
                </select>
                </div>
                <div className="attribute-group">
                    <label>Attraction Type 3</label>
                    <select className="input-field" onChange={(e) => { setVariable3(parseInt(e.target.value)); }} defaultValue={undefined}>
                    <option value={AttractionType.Beach}> {AttractionType[AttractionType["Beach"]]}</option>,
                    <option value={AttractionType.Hiking}> {AttractionType[AttractionType["Hiking"]]}</option>,
                    <option value={AttractionType.History}> {AttractionType[AttractionType["History"]]}</option>,
                    <option value={AttractionType.Fishing}> {AttractionType[AttractionType["Fishing"]]}</option>,
                    </select>
                    <label>Distance From Variable 1</label>
                    <select className="input-field" onChange={(e) => { setDistVar3(parseInt(e.target.value)); }} defaultValue={undefined}>
                    <option value={10}> 10km</option>,
                    <option value={50}> 50km</option>,
                    <option value={100}> 100km</option>,
                    <option value={500}> 500km</option>,
                    </select>
                </div>
            </div>
            <div className="button-container">
                <button className="re-run-button" onClick={() => setClicked(clicked + 1)}>Click to Re-Run</button>
            </div>
            <div className="map-component" data-testid="map-component">
                <div className="map-container" data-testid="map-container">
                    <MapChart chosen={chosen} setChosen={setChosen} clicked={clicked} userInput={userInput} />
                </div>
                <div className="map-info" data-testid="map-info">
                    <SightingMapInfo chosen={chosen} />
                </div>
            </div>
        </div>
    );
}