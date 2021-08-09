import React from "react";
import "../styles/PageNav.scss";
import { Button, Style } from "./Button";

interface pageNavProps {
    page: number;
    nextPage: () => void;
    previousPage: () => void;
}

export default function PageNav({ page, nextPage, previousPage }: pageNavProps): JSX.Element {

    return (
        <div className="page-nav" data-testid="page-nav">
            <Button
                style={page <= 1 ? Style.hidden : Style.secondary}
                text="Previous Page"
                onClick={() => previousPage()}
                minWidth25={true}
            />
            <div />
            <Button
                style={Style.secondary}
                text="Next Page"
                onClick={() => nextPage()}
                minWidth25={true}
            />
        </div>
    );
}
