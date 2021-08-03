import React from "react";
import { render, screen } from "@testing-library/react";
import PageNav from "../../components/PageNav";

test("Renders page nav", () => {
    render(<PageNav />);
    const pageNav = screen.getByTestId("page-nav");
    expect(pageNav).toBeInTheDocument();
});