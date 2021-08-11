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
                style={Style.secondary}
                text="Previous Page"
                onClick={() => previousPage()}
                minWidth25={true}
                hidden={page <= 1 ? true : false}
            />
            <div> Page {page} </div>
            <Button data-testid="next-page"
                style={Style.secondary}
                text="Next Page"
                onClick={() => nextPage()}
                minWidth25={true}
            />
        </div>
    );
}
