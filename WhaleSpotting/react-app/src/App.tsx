import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.scss";
import Home from "./components/Home";
import ReportSighting from "./components/ReportSighting";

function App(): JSX.Element {
    return (
        <Router>
            <Switch>
                <Route path="/Map" />
                <Route path="/Reportsighting" component={ReportSighting}/>
                <Route path="/Profile" />
                <Route path="/Login" />
                <Route path="/Register" />
                <Route path="" component={Home} />
            </Switch >
        </Router >
    );
}

export default App;
