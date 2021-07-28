import "../styles/ReportSighting.scss";
import React from "react";


export default function ReportSighting(): JSX.Element {
    return (
        <div className="report-sighting" data-testid="report-sighting">
            <img className="banner-image" src="https://ssl.tzoo-img.com/images/tzoo.1.0.685904.shutterstock_567677317.jpg" alt="whale" />

            <div className="sighting-contents">
                <div className="sightings-header">
                    <h2>Report Your Sighting</h2>
                </div>

                <div className="sighting-holder">

                    <form>
                        <div className="card-component">
                            <div className="left">
                                <input type="date" name="sighting-date-time" placeholder="Sighting Date Time" ></input>
                                <input type="text" name="species" placeholder="Species" ></input>
                                <input type="number" name="quantity" placeholder="Quantity" ></input>
                                <input type="text" name="longitude" placeholder="Longitude" ></input>
                            </div>
                            <div className="right">
                                <input type="text" name="location" placeholder="Location" ></input>
                                <input type="text" name="orca-type" placeholder="Ocra Type" ></input>
                                <input type="text" name="orca-pod" placeholder="Ocra Pod" ></input>
                                <input type="text" name="latitude" placeholder="Latitude" ></input>
                            </div>
                            <div>
                                <input type="textarea" name="description" placeholder="Description" ></input>
                                <input type="text" name="image-url" placeholder="Image url" ></input>
                            </div>
                        </div>
                        <div className="button">
                            <input type="submit" value="Submit"></input>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
}
