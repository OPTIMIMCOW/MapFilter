import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { Footer } from "./components/Footer";
import {Profile} from "./components/Profile";
import ReportSighting from "./components/ReportSighting";

function App(): JSX.Element {
    return (
        <Router>
            <Navbar />
            <Switch>
                <Route path="/map" />
                <Route path="/profile" component={Profile}/>
                <Route path="/login" />
                <Route path="/register" />
                <Route path="/reportsighting" component={ReportSighting}/>
                <Route path="" component={Home} />
            </Switch >
            <Footer />
        </Router >
    );
}

export default App;
