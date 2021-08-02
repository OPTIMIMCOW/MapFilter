import "../styles/ReportSighting.scss";
import React, { useState } from "react";
import { BannerImage } from "./BannerImage";

export default function ReportSighting(): JSX.Element {
    const [date, setDate] = useState("");
    const [location, setLocation] = useState("");
    const [species, setSpecies] = useState("");
    const [quantity, setQuantity] = useState("");
    const [longitude, setLongitude] = useState("");
    const [latitude, setLatitude] = useState("");
    const [orcaPod, setOrcaPod] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const sighting = { date, location, species, quantity, longitude, latitude, orcaPod, imageUrl, description };
        console.log(sighting);
    };

    return (
        <div className="report-sighting" data-testid="report-sighting">
            <BannerImage />
            <div className="container">
                <div className="title">Report Your Sighting</div>
                <form>
                    <div className="card-component">
                        <div className="sighting-details">
                            <div className="input-box">
                                <label >Sighting Date Time <span className="required">(required)</span></label>
                                <input className="input-field" name="date" type="date" placeholder="Enter sighting date" required
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}/>
                            </div>
                            <div className="input-box">
                                <label>Location <span className="required">(required)</span></label>
                                <input className="input-field"  type="text" name="location" placeholder="Enter your location" required
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}/>
                            </div>
                            <div className="input-box">
                                <label>Species <span className="required">(required)</span></label>
                                <input className="input-field" type="text" name="species" placeholder="Enter species" required
                                    value={species}
                                    onChange={(e) => setSpecies(e.target.value)}/>
                            </div>
                            <div className="input-box">
                                <label>Quantity</label>
                                <input className="input-field" type="number" placeholder="Enter quantity"
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}/>
                            </div>
                            <div className="input-box">
                                <label>Longitude</label>
                                <input className="input-field coordinates" type="number" placeholder="Enter your longitude"
                                    value={longitude}
                                    onChange={(e) => setLongitude(e.target.value)}/>
                            </div>
                            <div className="input-box">
                                <label>Latitude</label>
                                <input className="input-field coordinates" type="number" placeholder="Enter your latitude"
                                    value={latitude}
                                    onChange={(e) => setLatitude(e.target.value)}/>
                            </div>
                            <div className="input-box">
                                <label>Orca Pod</label>
                                <input className="input-field" type="text" placeholder="Enter the orca pod"
                                    value={orcaPod}
                                    onChange={(e) => setOrcaPod(e.target.value)}/>
                            </div>
                            <div className="input-box">
                                <label>Image Url</label>
                                <input className="input-field" type="url" placeholder="Enter your image url"
                                    value={imageUrl}
                                    onChange={(e) => setImageUrl(e.target.value)}/>
                            </div>
                            <div className="input-box description">
                                <label>Description</label>
                                <input className="input-field" type="textarea" placeholder="Enter description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}/>
                            </div>
                        </div>
                    </div>
                    <button onClick={handleSubmit} className="submit-button">
                        Submit Sighting
                    </button>
                </form>
            </div>
        </div>
    );
}