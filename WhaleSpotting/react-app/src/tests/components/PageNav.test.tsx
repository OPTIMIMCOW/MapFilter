import React from "react";
import { render, screen } from "@testing-library/react";
import PageNav from "../../components/PageNav";

const voidFunction = () => null;

test("Renders page nav", () => {
    render(<PageNav nextPage={voidFunction} previousPage={voidFunction} page={1}/>);
    const pageNav = screen.getByTestId("page-nav");
    expect(pageNav).toBeInTheDocument();
    const pageNumber = screen.getByTestId("page-number");
    expect(pageNumber).toBeInTheDocument();
});

test("Renders next page", () => {
    render(<PageNav nextPage={voidFunction} previousPage={voidFunction} page={1}/>);
    const pageNav = screen.getByTestId("next-page");
    expect(pageNav).toBeInTheDocument();
});

test("Not Render previous page on page 1", () => {
    render(<PageNav nextPage={voidFunction} previousPage={voidFunction} page={1}/>);
    const pageNav = screen.queryByText("Previous Page");
    expect(pageNav).toHaveAttribute("hidden");
});

test("Render previous page on page 2", () => {
    render(<PageNav nextPage={voidFunction} previousPage={voidFunction} page={2}/>);
    const pageNav = screen.getByTestId("previous-page");
    expect(pageNav).toBeInTheDocument();
});