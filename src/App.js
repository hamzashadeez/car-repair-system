import logo from "./logo.svg";
import "./App.css";
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
//#f7022a

const Main = ()=>{
  return(
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
            <Route exact path="/schedule" component={Schedule} />
            <Route exact path="/inventory" component={Inventory} />
            <Route exact path="/invoice" component={Invoice} />
            <Route exact path="/logout" component={Logout} />
          </Switch>
        </div>
      </div>
  )
}

function App() {
  return (
    // I will do a conditional rendering to display the login screen if not logged already
    <Router>
      <Main />
    </Router>
  );
}

export default App;
