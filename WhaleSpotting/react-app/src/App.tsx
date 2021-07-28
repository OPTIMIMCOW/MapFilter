import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";

function App(): JSX.Element {
    return (
        <Router>
            <Navbar />
            <Switch>
                <Route path="/map" />
                <Route path="/reportsighting" />
                <Route path="/profile" />
                <Route path="/login" />
                <Route path="/register" />
                <Route path="" component={Home} />
            </Switch >
        </Router >
    );
}

export default App;
