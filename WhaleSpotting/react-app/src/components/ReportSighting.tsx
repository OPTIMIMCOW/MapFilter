import "../styles/ReportSighting.scss";
import React from "react";

export default function ReportSighting(): JSX.Element {
    return (
        <div className="report-sighting" data-testid="report-sighting">
            <img className="banner-image" src="https://ssl.tzoo-img.com/images/tzoo.1.0.685904.shutterstock_567677317.jpg" alt="whale" />
            <div className="container">
                <div className="title">Report Your Sighting</div>
                <form action="#">
                    <div className="card-component">
                        <div className="sighting-details">
                            <div className="input-box">
                                <label className="details">Sighting Date Time</label>
                                <input type="date" placeholder="Enter Sighting Date Time" required></input>
                            </div>
                            <div className="input-box">
                                <label className="details">Location</label>
                                <input type="text" placeholder="Confirm your location" required></input>
                            </div>
                            <div className="input-box">
                                <label className="details">Species</label>
                                <input type="text" placeholder="Enter species" required></input>
                            </div>
                            <div className="input-box">
                                <label className="details">Quantity</label>
                                <input type="number" placeholder="Enter quantity" ></input>
                            </div>
                            <div className="input-box">
                                <label className="details">Longitude</label>
                                <input type="number" placeholder="Enter your longitude" ></input>
                            </div>
                            <div className="input-box">
                                <label className="details">Latitude</label>
                                <input type="number" placeholder="Enter your latitude" ></input>
                            </div>
                            <div className="input-box">
                                <label className="details">Orca Pod</label>
                                <input type="text" placeholder="Orca Pod" ></input>
                            </div>
                            <div className="input-box">
                                <label>Image Url</label>
                                <input type="url" placeholder="Image url"></input>
                            </div>
                            <div className="input-box">
                                <label>Description</label>
                                <input type="textarea" placeholder="Description"></input>
                            </div>
                        </div>
                    </div>
                    <div className="button">
                        <input type="submit" value="Submit Sighting"></input>
                    </div>
                </form>
            </div>
        </div>
    );
}
