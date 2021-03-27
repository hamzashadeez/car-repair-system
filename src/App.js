import logo from "./logo.svg";
import "./App.css";

import DashBoard from "./Screens/Admin/Dashboard";
import SideBar from "./Screens/Basics/SideBar";
//#f7022a
function App() {
  return (
    <div className="main">
      <SideBar />
      <div style={{padding: '40px', display: "flex", alignItems: 'center', justifyContent: "center", width: '100%'}}>
        <DashBoard />
      </div>
    </div>
  );
}

export default App;
