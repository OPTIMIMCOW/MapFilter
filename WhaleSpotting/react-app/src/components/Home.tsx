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
    const [searchFormOpen, setSearchFormOpen] = useState<Boolean>(false);
    const [fromDate, setFromDate] = useState<Date>(new Date());
    const [toDate, setToDate] = useState<Date>(new Date());
    const [location, setLocation] = useState<string>("");
    const [species, setSpecies] = useState<Species | number>(0);
    const [longitude, setLongitude] = useState<number | null>(null);
    const [latitude, setLatitude] = useState<number | null>(null);
    const [radiusKm, setRadiusKm] = useState<number>(50);
    const [orcaPod, setOrcaPod] = useState<string>("");
    const [orcaType, setOrcaType] = useState<OrcaType | number>(0);
    const [search, setSearch] = useState<SearchSightingRequestModel>({}); 

    useEffect(() => {
        searchSightings(search, page, 10)
            .then(data => setData(data));
    }, [page, search]);

    const cards = data.map((s, index) => <Card sighting={s} key={index} />);

    function nextPage() {
        setPage(page + 1);
    }

    function previousPage() {
        setPage(page - 1);
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setSearch({
            species: species === 0 ? null : species,
            location: location,
            longitude: longitude,
            latitude: latitude,
            sightedFrom: fromDate,
            sightedTo: toDate,
            orcaType: orcaType === 0 ? null : orcaType,
            orcaPod: orcaPod,
            radiusKm: radiusKm
        });
        setSearchFormOpen(!searchFormOpen);
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
                        link="/Reportsighting"
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
                <div hidden={!searchFormOpen} className="search-form"> 
                    <form onSubmit={handleSubmit}>
                        <div className="card-component">
                            <div className="sighting-details">
                                <div className="input-box">
                                    <label >Sighting Date From </label>
                                    <input className="input-field" name="date" type="date" placeholder="Enter sighting start date" required
                                        onChange={(e) => setFromDate(new Date(e.target.value))} />
                                </div>
                                <div className="input-box">
                                    <label >Sighting Date To </label>
                                    <input className="input-field" name="date" type="date" placeholder="Enter sighting end date" required
                                        onChange={(e) => setToDate(new Date(e.target.value))} />
                                </div>
                                <div className="input-box">
                                    <label>Location </label>
                                    <input className="input-field" type="text" name="location" placeholder="Enter your location" required
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)} />
                                </div>
                                <div className="input-box">
                                    <label>Species </label>
                                    <select className="input-field" onChange={(e) => { setSpecies(parseInt(e.target.value)); }}>
                                        <option selected value={0}>All</option>,
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
                                    <label>Radius in Km </label>
                                    <input className="input-field" type="number" placeholder="Enter radius from specified coordinates in Km"
                                        value={radiusKm}
                                        onChange={(e) => setRadiusKm(parseInt(e.target.value))} />
                                </div>
                                <div className="input-box">
                                    <label>Longitude </label>
                                    <input className="input-field coordinates" type="number" step="any" placeholder="Enter your longitude" required
                                        onChange={(e) => setLongitude(parseInt(e.target.value))} />
                                </div>
                                <div className="input-box">
                                    <label>Latitude </label>
                                    <input className="input-field coordinates" type="number" step="any" placeholder="Enter your latitude" required
                                        onChange={(e) => setLatitude(parseInt(e.target.value))} />
                                </div>
                                <div className="input-box">
                                    <label>Orca Type</label>
                                    <select className="input-field" onChange={(e) => { setOrcaType(parseInt(e.target.value)); }}>
                                        <option selected value={0}>N/A</option>,
                                        <option value={OrcaType.NorthernResident}>Northern Resident</option>,
                                        <option value={OrcaType.Offshore}>Offshore</option>,
                                        <option value={OrcaType.SouthernResident}>Southern Resident</option>,
                                        <option value={OrcaType.Transient}>Transient</option>,
                                    </select>
                                </div>
                                <div className="input-box">
                                    <label>Orca Pod</label>
                                    <input className="input-field" type="text" placeholder="Enter the orca pod"
                                        value={orcaPod}
                                        onChange={(e) => setOrcaPod(e.target.value)} />
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="submit-button">
                            Search
                        </button>
                        <button type="reset" className="reset-button" >
                            Reset
                        </button>
                    </form>
                </div>
                <div className="card-holder">
                    {cards.length === 0 ? "Loading..." : cards}
                </div>
                <PageNav page={page} nextPage={nextPage} previousPage={previousPage} />
            </div>
        </div>
    );
}
