import React from "react";
import { Container } from "reactstrap";
import NavMenu from "./NavMenu";

export default function Layout({children}: {children: JSX.Element | JSX.Element[]}): JSX.Element {

    return (
        <div>
            <NavMenu />
            <Container>
                {children}
            </Container>
        </div>
    );
}