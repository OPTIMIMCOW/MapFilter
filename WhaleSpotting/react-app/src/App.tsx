import { useContext } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.scss';
import Layout from "./components/Layout";
import Home from "./components/Home";
import Counter from "./components/Counter";
import FetchData from "./components/FetchData";
import { Nav } from 'reactstrap';



function App() {

    return (
        <Router>
            <Nav />
                <Switch>
                    <Route exact path='/'  />
                    <Route path='/map'  />
                    <Route path='/reportsighting'  />
                    <Route path='/profile'  />
                    <Route path='/login'  />
                    <Route path='/register'  />
                    <Route path="*">
                        <Home />
                    </Route>
                </Switch >
            <Footer />
        </Router >
    );
}
export default App;
