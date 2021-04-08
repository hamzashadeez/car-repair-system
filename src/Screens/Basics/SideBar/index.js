import React from "react";
import { useHistory } from "react-router-dom";
import "./style.css";

function SideBar() {
  let history = useHistory();

  return (
    <div className="sidebar">
      <h3 className="app_title">Car Repair</h3>
      <div className='admin_profile_div'>
        <i class="fas fa-user"></i>
        <p>Admin</p>
      </div>

      <div>
        <div className="links">
        <i class="fas fa-tachometer-alt"></i>
          <h6 onClick={()=> history.push('/')}>DashBoard</h6>
        </div>
        <div className="links">
        <i class="fas fa-car"></i>
          <h6 onClick={()=> history.push('/order')}>Order</h6>
        </div>
        <div className="links">
        <i class="fas fa-cog"></i>
          <h6 onClick={()=> history.push('/mechanics')}>Mechanics</h6>
        </div>
        <div className="links">
        <i class="fas fa-file-invoice-dollar"></i>
          <h6 onClick={()=> history.push('/invoice')}>Invoice</h6>
        </div>
        <div className="links">
        <i class="fas fa-list-alt"></i>
          <h6 onClick={()=> history.push('/inventory')}>Inventory</h6>
        </div>
        <div className="links">
        <i class="far fa-calendar-alt"></i>
          <h6 onClick={()=> history.push('/schedule')}>Schedules</h6>
        </div>
        <div className="links">
        <i class="fas fa-sign-out-alt"></i>
          <h6 onClick={()=> history.push('/logout')}>Log Out</h6>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
