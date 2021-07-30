import "../styles/ReportSighting.scss";
import React, { useState } from "react";

export default function ReportSighting(): JSX.Element {
    const [datetime, setDatetime] = useState("");
    const [location, setLocation] = useState("");
    const [species, setSpecies] = useState("");
    const [quantity, setQuantity] = useState("");
    const [longitude, setLongitude] = useState("");
    const [latitude, setLatitude] = useState("");
    const [orcaPod, setOrcaPod] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const sighting = { datetime, location, species, quantity, longitude, latitude, orcaPod, imageUrl, description };
        console.log(sighting);
    };

    return (
        <div className="report-sighting" data-testid="report-sighting">
            <img className="banner-image" src="https://ssl.tzoo-img.com/images/tzoo.1.0.685904.shutterstock_567677317.jpg" alt="whale" />
            <div className="container">
                <div className="title">Report Your Sighting</div>
                <form action="#" onSubmit={(e)=>handleSubmit(e)}>
                    <div className="card-component">
                        <div className="sighting-details">
                            <div className="input-box">
                                <label className="details">Sighting Date Time <span className="required">(required)</span></label>
                                <input className="input-field" name="datetime" type="date" placeholder="Enter sighting date and time" required
                                    value={datetime}
                                    onChange={(e) => setDatetime(e.target.value)}/>
                            </div>
                            <div className="input-box">
                                <label className="details">Location <span className="required">(required)</span></label>
                                <input className="input-field"  type="text" name="location" placeholder="Confirm your location" required
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}/>
                            </div>
                            <div className="input-box">
                                <label className="details">Species <span className="required">(required)</span></label>
                                <input className="input-field" type="text" name="species" placeholder="Enter species" required
                                    value={species}
                                    onChange={(e) => setSpecies(e.target.value)}/>
                            </div>
                            <div className="input-box">
                                <label className="details">Quantity</label>
                                <input className="input-field" type="number" placeholder="Enter quantity"
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}/>
                            </div>
                            <div className="input-box">
                                <label className="details">Longitude</label>
                                <input className="input-field coordinates" type="number" placeholder="Enter your longitude"
                                    value={longitude}
                                    onChange={(e) => setLongitude(e.target.value)}/>
                            </div>
                            <div className="input-box">
                                <label className="details">Latitude</label>
                                <input className="input-field coordinates" type="number" placeholder="Enter your latitude"
                                    value={latitude}
                                    onChange={(e) => setLatitude(e.target.value)}/>
                            </div>
                            <div className="input-box">
                                <label className="details">Orca Pod</label>
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
                    <div className="button">
                        <input className="input-field" type="submit" value="Submit Sighting"/>
                    </div>
                </form>
            </div>
        </div>
    );
}