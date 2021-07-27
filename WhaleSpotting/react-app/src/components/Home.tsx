import React from 'react';

export default function Home() {
    return (
        <div className = "home">
            <img className = "banner-image" src="https://ssl.tzoo-img.com/images/tzoo.1.0.685904.shutterstock_567677317.jpg" alt=""></img>
             
             <button className="report-button">REPORT SIGHTING</button>
             <button className="filter-button">Order By Location</button>

             <h2>Recent Sightings</h2>
             <p>put the card components here</p>

             {/* <button className = "nav" OnClick=re-render component with next 10>Previous<button/> */}
             {/* <button className = "nav" OnClick=re-render component with next 10>Next<button/> */}
        </div>
    );
}
