import React from "react";
import "../styles/PageNav.scss";

export default function PageNav() : JSX.Element {
    return (
        <div className="page-nav" data-testid="page-nav">
            <button className="page-button"> Previous Page</button>
            <button className="page-button" >Next Page</button>
        </div>
    );
}

