import React from "react";
import { Container } from "reactstrap";
import Navbar from "./Navbar";

export default function Layout({children}: {children: JSX.Element | JSX.Element[]}): JSX.Element {

    return (
        <div>
            <Navbar />
            <Container>
                {children}
            </Container>
        </div>
    );
}