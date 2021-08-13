import React from "react";
import { render, screen } from "@testing-library/react";
import PageNav from "../../components/PageNav";

const voidFunction = () => null;

test("Renders page nav", () => {
    render(<PageNav nextPage={voidFunction} previousPage={voidFunction} page={1} count={10} size={10}/>);
    const pageNav = screen.getByTestId("page-nav");
    expect(pageNav).toBeInTheDocument();
    const pageNumber = screen.getByTestId("page-number");
    expect(pageNumber).toBeInTheDocument();
});

test("Renders next page", () => {
    render(<PageNav nextPage={voidFunction} previousPage={voidFunction} page={1} count={10} size={10}/>);
    const pageNav = screen.getByTestId("next-page");
    expect(pageNav).toBeInTheDocument();
});

test("Not Render previous page on page 1", () => {
    render(<PageNav nextPage={voidFunction} previousPage={voidFunction} page={1} count={10} size={10}/>);
    const pageNav = screen.queryByText("Previous Page");
    expect(pageNav).toHaveAttribute("hidden");
});

test("Render previous page on page 2", () => {
    render(<PageNav nextPage={voidFunction} previousPage={voidFunction} page={2} count={10} size={10}/>);
    const pageNav = screen.getByTestId("previous-page");
    expect(pageNav).toBeInTheDocument();
});

test("Not Render next page if count is less than page size", () => {
    render(<PageNav nextPage={voidFunction} previousPage={voidFunction} page={1} count={8} size={10} />);
    const pageNav = screen.queryByText("Next Page");
    expect(pageNav).toHaveAttribute("hidden");
});