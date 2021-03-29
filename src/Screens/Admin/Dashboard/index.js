import "./styles.css";
import React from "react";

const Box = ({ label, num }) => {
  return (
    <div className="box">
      <div>
        <h3>{num}</h3>
      </div>
      <p>{label}</p>
    </div>
  );
};

const DashBoard = () => {
  return (
    <div className="dashboard">
      <h3 style={{ color: "black", marginBottom: '2px', fontWeight: '500' }}>Dashboard</h3>
      <div className="boxContainer">
        <Box num={20} label={"Cars in Operation"} />
        <Box num={19} label={"Income Generated"} />
        <Box num={4} label={"Number of Mechanics"} />
        <Box num={33} label={"Customers"} />
      </div>
    </div>
  );
};

export default DashBoard;
