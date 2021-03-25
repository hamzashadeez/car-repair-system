import logo from './logo.svg';
import './App.css';


import DashBoard from './Screens/Admin/Dashboard'
import SideBar from './Screens/Basics/SideBar';
//#f7022a
function App() {
  return (
    <div className="main">
      <SideBar />
      <DashBoard />
    </div>
  );
}

export default App;
