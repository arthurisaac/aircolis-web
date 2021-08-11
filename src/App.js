//import logo from './logo.svg';
import './App.css';
import React, {useEffect} from 'react';
import Routes from "./routes/routes";
import {BrowserRouter as Router} from "react-router-dom";
import Login from "./pages/login";
import {useDispatch, useSelector} from "react-redux";
import {connexion} from "./actions";
import NavigationBar from "./pages/navigation";

const App = () => {
    const isLogged = useSelector(state => state.isLogged);
    const dispatch = useDispatch();

    useEffect(() => {
        if (sessionStorage.getItem('success')) {
            dispatch(connexion());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Router>
            {isLogged ? <div><NavigationBar /><Routes /> </div>: <Login />}
        </Router>
    );
};

export default App;
