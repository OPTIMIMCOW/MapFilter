import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.scss";
import AuthorizeRoute from "./components/api-authorization/AuthorizeRoute";
import Home from "./components/Home";
import Counter from "./components/Counter";
import FetchData from "./components/FetchData";
import { ApplicationPaths } from "./components/api-authorization/ApiAuthorizationConstants";
import ApiAuthorizationRoutes from "./components/api-authorization/ApiAuthorizationRoutes";
import {Profile} from "./components/Profile";
import { Footer } from "./components/Footer";
import Navbar from "./components/Navbar";


function App(): JSX.Element {
    return (
        <Router>
            <Navbar />
            <Switch>
                <Route path="/map" />
                <AuthorizeRoute path="/reportsighting" />
                <AuthorizeRoute path="/profile" component={Profile}/>
                <Route path="/login" />
                <Route path="/register" />
                <AuthorizeRoute path="/weather" component={FetchData} />
                <Route path="/counter" component={Counter} />
                <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />
                <Route path="" component={Home} />
            </Switch >
            <Footer />
        </Router >
    );
}

export default App;
