import React from "react";
import "./style.css";

function SideBar() {
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
          <h6>DashBoard</h6>
        </div>
        <div className="links">
        <i class="fas fa-chart-line"></i>
          <h6>Activites</h6>
        </div>
        <div className="links">
        <i class="fas fa-cog"></i>
          <h6>Mechanics</h6>
        </div>
        <div className="links">
        <i class="fas fa-file-invoice-dollar"></i>
          <h6>Invoice</h6>
        </div>
        <div className="links">
        <i class="far fa-calendar-alt"></i>
          <h6>Schedules</h6>
        </div>
        <div className="links">
        <i class="fas fa-sign-out-alt"></i>
          <h6>Log Out</h6>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
