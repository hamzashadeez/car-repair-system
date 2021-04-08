import logo from "./logo.svg";
import "./App.css";
import React, {useContext} from 'react'
import {UserContext} from './UserContext'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import DashBoard from "./Screens/Admin/Dashboard";
import SideBar from "./Screens/Basics/SideBar";
import Mechanics from "./Screens/Mechanics";
import Requests from "./Screens/Mechanics/Requests";
import Cars from "./Screens/Cars";
import Schedule from "./Screens/Schedule";
import Inventory from "./Screens/Inventory";
import Invoice from "./Screens/Invoice";
import Logout from "./Screens/Auth/Logout";
import Login from "./Screens/Auth/Login";
import NewCar from "./Screens/Cars/NewCar";
import CompletedCars from "./Screens/Cars/CompletedCars";
import UserDash from "./Users/Dashboard";
import Item from './Screens/Inventory/Item'
import Order from './Screens/Order'

//#f7022a

const Main = () => {
  return (
    <div className="main">
      <SideBar />
      <div
        style={{
          padding: "40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Switch>
          <Route exact path="/" component={DashBoard} />
          <Route exact path="/mechanics" component={Mechanics} />
          <Route exact path="/mechanics/requests" component={Requests} />
          <Route exact path="/cars" component={Cars} />
          <Route exact path="/cars/new" component={NewCar} />
          <Route exact path="/cars/completed" component={CompletedCars} />
          <Route exact path="/schedule" component={Schedule} />
          <Route exact path="/inventory" component={Inventory} />
          <Route exact path="/invoice" component={Invoice} />
          <Route exact path="/logout" component={Logout} />
          <Route exact path="/item" component={Item} />
          <Route exact path="/order" component={Order} />
          
        </Switch>
      </div>
    </div>
  );
};


const Others = () =>{
  return(
    <Switch>
    <Route exact path="/" component={UserDash} />
  </Switch>
  )
}

function App() {
  const [state, setState] = useContext(UserContext)
  // const user = localStorage.getItem("userAuth");
  if (state.name === "mr admin") {
    return (
      <Router>
        <Main />
      </Router>
    );
  } 
  if (state.name !== "mr admin" && state.name !== "") {
    return(
      <Router>
        <Others />
      </Router>
    )
  }
  else {
    return <Login />;
  }
}

export default App;
