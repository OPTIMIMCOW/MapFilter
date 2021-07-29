import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.scss";
import AuthorizeRoute from "./components/api-authorization/AuthorizeRoute";
import Home from "./components/Home";
import Counter from "./components/Counter";
import FetchData from "./components/FetchData";
import { ApplicationPaths } from "./components/api-authorization/ApiAuthorizationConstants";
import ApiAuthorizationRoutes from "./components/api-authorization/ApiAuthorizationRoutes";


function App(): JSX.Element {
    return (
        <Router>
            <Switch>
                <Route path="/map" />
                <AuthorizeRoute path="/reportsighting" />
                <AuthorizeRoute path="/profile" />
                <Route path="/login" />
                <Route path="/register" />
                <AuthorizeRoute path="/weather" component={FetchData} />
                <Route path="/counter" component={Counter} />
                <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />
                <Route path="" component={Home} />
            </Switch >
        </Router >
    );
}

export default App;
