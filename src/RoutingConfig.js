import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Time from "./components/Time";
import Home from "./components/Home";
import Data from "./components/Data";
import Currency from "./components/Currency";
import React from "react";

function RoutingConfig() {
  return (
    <Router>
      <Route exact path="/home" component={Home} />
      <Route exact path="/time" component={Time} />
      <Route exact path="/data" component={Data} />
      <Route exact path="/currency" component={Currency} />
      <Redirect to="/home" />
    </Router>
  );
}

export default RoutingConfig;
