import React, { useState, useEffect } from "react";
import "../styles/Home.scss";
import PageNav from "./PageNav";
import { Button, Style } from "./Button";
import Card from "./Card";
import { SightingApiModel } from "../api/models/SightingApiModel";
import { BannerImage } from "./BannerImage";
import { searchSightings } from "../api/apiClient";
import { Species, OrcaType } from "../api/ApiEnums";
import { SearchSightingRequestModel } from "../api/models/SearchSightingRequestModel";

export default function Home(): JSX.Element {
    const [page, setPage] = useState(1);
    const [data, setData] = useState<SightingApiModel[]>([]);
    const [searchFormOpen, setSearchFormOpen] = useState<boolean>(false);
    const [fromDate, setFromDate] = useState<Date | null>(null);
    const [toDate, setToDate] = useState<Date | null>(null);
    const [location, setLocation] = useState<string>("");
    const [species, setSpecies] = useState<Species | number>(0);
    const [longitude, setLongitude] = useState<number | null>(null);
    const [latitude, setLatitude] = useState<number | null>(null);
    const [radiusKm, setRadiusKm] = useState<number>(50);
    const [orcaPod, setOrcaPod] = useState<string>("");
    const [orcaType, setOrcaType] = useState<OrcaType | number>(0);
    const [search, setSearch] = useState<SearchSightingRequestModel>({
        species: null,
        location: "",
        longitude: null,
        latitude: null,
        sightedFrom: null,
        sightedTo: null,
        orcaType: null,
        orcaPod: "",
        radiusKm: 50,
        confirmed: true
    });

    useEffect(() => {
        searchSightings(search, page, 10)
            .then(data => setData(data));
    }, [page]);
   
    const cards = data.map((s, index) => <Card sighting={s} key={index} />);

    function nextPage() {
        setPage(page + 1);
    }

    function previousPage() {
        setPage(page - 1);
    }

    function resetForm() {
        setSearchFormOpen(!searchFormOpen);
        setFromDate(null);
        setToDate(null);
        setLocation("");
        setSpecies(0);
        setRadiusKm(50);
        setLongitude(null);
        setLatitude(null);
        setOrcaType(0);
        setOrcaPod("");
        setPage(1);
    }
    
    function resetSearch() {
        setSearch({
            species: null,
            location: "",
            longitude: null,
            latitude: null,
            sightedFrom: null,
            sightedTo: null,
            orcaType: null,
            orcaPod: "",
            radiusKm: 50,
            confirmed: true
        });
        resetForm();
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formSearch: SearchSightingRequestModel = {
            species: species === 0 ? null : species,
            location: location,
            longitude: longitude,
            latitude: latitude,
            sightedFrom: fromDate,
            sightedTo: toDate,
            orcaType: orcaType === 0 ? null : orcaType,
            orcaPod: orcaPod,
            radiusKm: radiusKm,
            confirmed: true
        };
        setSearch(formSearch);
        resetForm();
    }

    function formatDate(date: Date | null): string {
        if (!date) {
            return "";
        }
        let month = "" + ((date.getMonth() ?? 0) + 1);
        let day = "" + date.getDate();
        const year = date.getFullYear();

        if (month.length < 2)
            month = "0" + month;
        if (day.length < 2)
            day = "0" + day;

        return [year, month, day].join("-");
    }

    return (
        <div className="home" data-testid="home">
            <BannerImage />
            <div className="home-contents">
                <div className="report-button-container">
                    <Button
                        style={Style.primary}
                        text="REPORT SIGHTING"
                        dataTestId="sighting-button"
                        link="/reportsighting"
                    />
                </div>
                <div className="sightings-header">
                    <h2>Recent Sightings</h2>
                    <Button
                        style={Style.secondary}
                        text="Filter Results"
                        dataTestId="filter-button"
                        onClick={() => setSearchFormOpen(!searchFormOpen)}
                        minWidth25={true}
                    />
                </div>
                <div hidden={!searchFormOpen} className="search-form" data-testid="search-form">
                    <form onSubmit={handleSubmit}>
                        <div className="card-component">
                            <div className="sighting-details">
                                <div className="input-box">
                                    <label >Sighting Date From </label>
                                    <input className="input-field" name="date" type="date" placeholder="Enter sighting start date"
                                        value={formatDate(fromDate)} max={formatDate(new Date())}
                                        onChange={(e) => setFromDate(new Date(e.target.value))} />
                                </div>
                                <div className="input-box">
                                    <label >Sighting Date To </label>
                                    <input className="input-field" name="date" type="date" placeholder="Enter sighting end date"
                                        value={formatDate(toDate)} max={formatDate(new Date())}
                                        onChange={(e) => setToDate(new Date(e.target.value))} />
                                </div>
                                <div className="input-box">
                                    <label>Location </label>
                                    <input className="input-field" type="text" name="location" placeholder="Enter your location"
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)} />
                                </div>
                                <div className="input-box">
                                    <label>Species </label>
                                    <select className="input-field" onChange={(e) => { setSpecies(parseInt(e.target.value)); }} value={species}>
                                        <option value={0}>All</option>,
                                        <option value={Species.AtlanticWhiteSidedDolphin}>Atlantic White Sided Dolphin</option>,
                                        <option value={Species.CaliforniaSeaLion}>California Sea Lion</option>,
                                        <option value={Species.DallsPorpoise}>Dalls Porpoise</option>,
                                        <option value={Species.GrayWhale}>Gray Whale</option>,
                                        <option value={Species.HarborPorpoise}>Harbor Porpoise</option>,
                                        <option value={Species.HarborSeal}>Harbor Seal</option>,
                                        <option value={Species.Humpback}>Humpback</option>,
                                        <option value={Species.Minke}>Minke</option>,
                                        <option value={Species.NorthernElephantSeal}>Northern Elephant Seal</option>,
                                        <option value={Species.Orca}>Orca</option>,
                                        <option value={Species.Other}>Other</option>,
                                        <option value={Species.PacificWhiteSidedDolphin}>Pacific White Sided Dolphin</option>,
                                        <option value={Species.SeaOtter}>Sea Otter</option>,
                                        <option value={Species.SouthernElephantSeal}>Southern Elephant Seal</option>,
                                        <option value={Species.StellerSeaLion}>Steller Sea Lion</option>,
                                        <option value={Species.Unknown}>Unknown</option>,
                                    </select>
                                </div>
                                <div className="input-box">
                                    <label>Longitude </label>
                                    <input className="input-field coordinates" type="number" step="any" placeholder="Enter your longitude"
                                        value={longitude ?? ""} min="-180" max="180"
                                        onChange={(e) => setLongitude(parseInt(e.target.value))} />
                                </div>
                                <div className="input-box">
                                    <label>Radius in Km </label>
                                    <input className="input-field" type="number" placeholder="Enter radius from specified coordinates in Km" 
                                        value={radiusKm} min="1" max="10000"
                                        onChange={(e) => setRadiusKm(parseInt(e.target.value))} />
                                </div>
                                <div className="input-box">
                                    <label>Latitude </label>
                                    <input className="input-field coordinates" type="number" step="any" placeholder="Enter your latitude"
                                        value={latitude ?? ""} min="-90" max="90"
                                        onChange={(e) => setLatitude(parseInt(e.target.value))} />
                                </div>
                                <div className="input-box" hidden={species !== Species.Orca}>
                                    <label>Orca Type</label>
                                    <select className="input-field" onChange={(e) => { setOrcaType(parseInt(e.target.value)); }} value={orcaType}>
                                        <option value={0}>N/A</option>,
                                        <option value={OrcaType.NorthernResident}>Northern Resident</option>,
                                        <option value={OrcaType.Offshore}>Offshore</option>,
                                        <option value={OrcaType.SouthernResident}>Southern Resident</option>,
                                        <option value={OrcaType.Transient}>Transient</option>,
                                    </select>
                                </div>
                                <div className="input-box" hidden={species !== Species.Orca}>
                                    <label>Orca Pod</label>
                                    <input className="input-field" type="text" placeholder="Enter the orca pod"
                                        value={orcaPod}
                                        onChange={(e) => setOrcaPod(e.target.value)} />
                                </div>
                            </div>
                            <button type="reset" onClick={resetSearch} className="submit-button" data-testid="reset-button">
                                Clear
                            </button>
                            <button type="submit" className="submit-button" data-testid="submit-button">
                                Search
                            </button>
                        </div>
                    </form>
                </div>
                <div className="card-holder">
                    {cards.length === 0 ? "No Sightings Found" : cards}
                </div>
                <PageNav page={page} nextPage={nextPage} previousPage={previousPage} count={cards.length} />
            </div>
        </div>
    );
}
