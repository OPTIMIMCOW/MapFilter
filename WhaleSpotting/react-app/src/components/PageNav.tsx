import React, { useState } from "react";
import "../styles/PageNav.scss";
import { Button } from "./Button";

export default function PageNav(): JSX.Element {
    const [page, setPage] = useState(1);

    return (
        <div className="page-nav" data-testid="page-nav">
            <Button
                stylePrimary={false}
                text="Previous Page"
                onClick={() => setPage(page - 1)}
                minWidth25={true}
            />
            <Button
                stylePrimary={false}
                text="Next Page"
                onClick={() => setPage(page + 1)}
                minWidth25={true}
            />
        </div>
    );
}
