import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.scss';
import Home from "./components/Home";

function App() {
    return (
        <Router>
            <Switch>
                <Route path='/map' />
                <Route path='/reportsighting' />
                <Route path='/profile' />
                <Route path='/login' />
                <Route path='/register' />
                <Route path='' component={Home} />
            </Switch >
        </Router >
    );
}

export default App;
