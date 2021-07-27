import React from "react";

export default function PageNav() {
    return (
        <div className="page-nav" data-testid="page-nav">
            <button className="page-button"> Previous Page</button>
            <button className="page-button" >Next Page</button>
        </div>
    );
}

