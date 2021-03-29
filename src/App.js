import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import DashBoard from "./Screens/Admin/Dashboard";
import SideBar from "./Screens/Basics/SideBar";
import Mechanics from "./Screens/Mechanics";
import Cars from "./Screens/Cars";
import Schedule from "./Screens/Schedule";
import Inventory from "./Screens/Inventory";
import Invoice from "./Screens/Invoice";
import Logout from "./Screens/Auth/Logout";
//#f7022a
function App() {
  return (
    <Router>
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
            <Route exact path="/cars" component={Cars} />
            <Route exact path="/schedule" component={Schedule} />
            <Route exact path="/inventory" component={Inventory} />
            <Route exact path="/invoice" component={Invoice} />
            <Route exact path="/logout" component={Logout} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
