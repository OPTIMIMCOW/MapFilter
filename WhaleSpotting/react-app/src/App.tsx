import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.scss";
import Home from "./components/Home";
import { Footer } from "./components/Footer";
import {Profile} from "./components/Profile";

function App(): JSX.Element {
    return (
        <Router>
            <Switch>
                <Route path="/map" />
                <Route path="/reportsighting" />
                <Route path="/profile" component={Profile}/>
                <Route path="/login" />
                <Route path="/register" />
                <Route path="" component={Home} />
            </Switch >
            <Footer />
        </Router >
    );
}

export default App;
