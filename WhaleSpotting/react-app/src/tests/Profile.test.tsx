import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { Profile } from "../components/Profile";

test("renders the Profile page", () => {
    render(
        <Router>
            <Profile />
        </Router>
    );
    const title = screen.getByText("Profile Page");
    expect(title).toBeInTheDocument();
});