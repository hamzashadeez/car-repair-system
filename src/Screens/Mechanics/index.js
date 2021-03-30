import React, { useState } from "react";
import "./style.css";
import { useHistory } from "react-router-dom";

const ListItem = ({ data, select }) => {
  let status = data.status === "active" ? "active" : "not_active";
  return (
    <div
      onClick={() => {
        select(data);
      }}
      className="list_item_mechanics"
    >
      <div className={`dot ${status}`}></div>
      <div style={{ fontSize: "15px" }}>{data.name}</div>
    </div>
  );
};

function Mechanics() {
  let history = useHistory();
  const [selected, setSelected] = useState({});
  const imgDP = require('../../Assets/userpic.png')

  const select = (data) => {
    setSelected(data);
    console.log(data);
  };

  const mechanics = [
    {
      id: 1,
      name: "Hamza Shadeez",
      status: "active",
      email: "hamza@gmail.com",
    },
    {
      id: 2,
      name: "John Doe",
      status: "not active",
      email: "johndoe@gmail.com",
    },
    {
      id: 3,
      name: "Osman Yasir",
      status: "active",
      email: "osman1212@gmail.com",
    },
    { id: 4, name: "Amir Zain", status: "active", email: "amirzain@gmail.com" },
  ];

  return (
    <div className="screen">
      <h5
        onClick={() => history.push("/mechanics/requests")}
        id="request_to_join"
      >
        Requests(1)
      </h5>
      <div className="flex__div">
        <div className="mechanics__list__div">
            <div>
                <img alt='user' src={imgDP}/>
            </div>
            <div>configs</div>
        </div>
        <div className="mechanics_div_profile">
          <h5>List of Mechanics ({mechanics.length})</h5>
          <div>
            {mechanics.map((d) => (
              <ListItem key={d.id} data={d} select={select} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mechanics;
