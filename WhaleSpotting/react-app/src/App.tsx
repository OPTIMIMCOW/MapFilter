import React from "react";
import { Route } from "react-router";
import "./App.scss";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Counter from "./components/Counter";
import FetchData from "./components/FetchData";
import { BrowserRouter } from "react-router-dom";

function App(): JSX.Element {
    return (
        <BrowserRouter>
            <Layout>
                <Route exact path='/' component={Home} />
                <Route path='/counter' component={Counter} />
                <Route path='/fetch-data' component={FetchData} />
            </Layout>
        </BrowserRouter>
    );
}

export default App;
