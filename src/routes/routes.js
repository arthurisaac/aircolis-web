import React  from "react";
import {
    Switch,
    Route
} from "react-router-dom";
import About from "../pages/about";
import Users from "../pages/users";
import Home from "../pages/home";
import Login from "../pages/login";

export default function Routes() {

    return (
        <Switch>
            <Route path="/about">
                <About/>
            </Route>
            <Route path="/users">
                <Users/>
            </Route>
            <Route path="/login">
                <Login/>
            </Route>
            <Route path="/">
                <Home/>
            </Route>
        </Switch>
    );
}