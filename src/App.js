import React, { Component } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { Signin } from "./components";
import { DashBoard } from "./components";
import { connect } from "react-redux";
import allData from "./DummyData-4.json";

import { getAllData } from "./stateManager/actions";

import "antd/dist/antd.css";

class App extends Component {
  state = {};
  componentDidMount() {
    console.log("allData", allData);
    let product_1 = allData.filter(data => data.product === "Product 1");
    let product_2 = allData.filter(data => data.product === "Product 2");
    let product_3 = allData.filter(data => data.product === "Product 3");
    // console.log("product1", product1);
    let Product1 = {
      Product1: product_1
    };
    let Product2 = {
      Product2: product_2
    };
    let Product3 = {
      Product3: product_3
    };
    this.props.getAllData(Product1);
    this.props.getAllData(Product2);
    this.props.getAllData(Product3);
  }
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path={["/", "/Signin"]} component={Signin} />
            <Route path="/dashboard" component={DashBoard} />
          </Switch>
        </Router>
      </div>
    );
  }
}

// export default App;
const mapStateToProps = state => {
  console.log("state", state);
  return {
    user: state
  };
};

export default connect(
  mapStateToProps,
  { getAllData }
)(App);
