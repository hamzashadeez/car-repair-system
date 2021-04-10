import React from "react";
import "./style.css";

const ExpoListItem = ({ type }) => {
  return (
    <div className="ExpoListItem">
      <div className="cont ml-1">
        {type !== "expense" ? (
          <i className="fas fa-arrow-up" style={{ color: "seagreen" }}></i>
        ) : (
          <i className="fas fa-arrow-down" style={{ color: "indianred" }}></i>
        )}
      </div>
      <div className="ExpoSideDiv">
        {type !== "expense" ? <h4 style={{color: "seagreen"}}>$21092</h4> : <h4 style={{color: "indianred"}}>$21092</h4>}
        <p>Type</p>
        <p>20/12/2020</p>
      </div>
    </div>
  );
};

const ExpBox = ({ value, color, arrow }) => {
  return (
    <div
      className="BoxExp"
      style={{ borderBottom: `7px solid ${color}`, color: color }}
    >
      <h4>${value}</h4>
      <div>
        <i className={arrow}></i>
      </div>
    </div>
  );
};

function Expenses() {
  return (
    <div className="screen">
      <div className="expense">
        <div className="menu_exp">
          <ExpBox arrow="fas fa-arrow-up" value="2329" color="seagreen" />
          <ExpBox arrow="fas fa-arrow-down" value="1323" color="indianred" />
        </div>
        <div className="list_exp">
          <ExpoListItem type="expense" />
          <ExpoListItem type="income" />
          <ExpoListItem type="expense" />
          <ExpoListItem type="income" />
          <ExpoListItem type="expense" />
          <ExpoListItem type="income" />
          <ExpoListItem type="expense" />
          <ExpoListItem type="income" />
        </div>
      </div>
    </div>
  );
}

export default Expenses;
