import React from "react";
import "./style.css";
import { useHistory } from "react-router-dom";
function LogOutMech() {
  const history = useHistory();
  const logout = ()=>{
    //   log out
  }
  return (
    <div className="screenn">
      <div className="main_log">
        <div className="logOutMech shadow">
          <p>Want to Log out ?</p>
          <div className="mt-3">
            <button className="btn btn-success mr-2" onClick={()=>history.push('/')}>No, Go back</button>
            <button className="btn btn-danger" onClick={()=>logout()}>Yes, Log Out</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogOutMech;
