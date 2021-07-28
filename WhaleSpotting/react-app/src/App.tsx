import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.scss";
import AuthorizeRoute from "./components/api-authorization/AuthorizeRoute";
import Home from "./components/Home";

function App(): JSX.Element {
    return (
        <Router>
            <Switch>
                <Route path="/map" />
                <AuthorizeRoute path="/reportsighting" />
                <AuthorizeRoute path="/profile" />
                <Route path="/login" />
                <Route path="/register" />
                <Route path="" component={Home} />
            </Switch >
        </Router >
    );
}

export default App;
