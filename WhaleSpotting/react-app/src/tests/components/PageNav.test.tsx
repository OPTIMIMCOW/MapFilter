import React from "react";
import { render, screen } from "@testing-library/react";
import PageNav from "../../components/PageNav";

const voidFunction = () => null;

test("Renders page nav", () => {
    render(<PageNav nextPage={voidFunction} previousPage={voidFunction} page={1}/>);
    const pageNav = screen.getByTestId("page-nav");
    expect(pageNav).toBeInTheDocument();
});