import React, { useState } from "react";
import "./style.css";
import { useHistory } from "react-router-dom";
//images
import Car1 from "../../images/car1.png";
import Car2 from "../../images/car2.png";
import Car3 from "../../images/car3.png";
import Car4 from "../../images/car4.png";

const Car = ({ data, select }) => {
  return (
    <div className="car" onClick={() => select(data)}>
      {data.name}
      <i class="fas fa-chevron-right"></i>
    </div>
  );
};

function Cars() {
  let history = useHistory();
  const [selected, setSelected] = useState({});
  const select = (data) => {
    setSelected(data);
  };
  const data = [
    {
      name: "Corolla",
      model: "12-12",
      picture: Car1,
      date_recieved: "31/03/2021",
      collection_date: "02/04/2021",
      color: "Black",
      status: "active",
      owner_name: "Habib yasir",
      owner_phone: "+323442342",
      cost: "",
    },
    {
      name: "BMW",
      model: "12-12",
      picture: Car2,
      date_recieved: "31/03/2021",
      collection_date: "02/04/2021",
      color: "Red",
      status: "active",
      owner_name: "Osman Alhasan",
      owner_phone: "+323442342",
      cost: "",
    },
    {
      name: "Cadillac",
      model: "12-12",
      picture: Car3,
      date_recieved: "31/03/2021",
      collection_date: "02/04/2021",
      color: "Purle",
      status: "active",
      owner_name: "Mohammad Husain",
      owner_phone: "+323442342",
      cost: "",
    },
    {
      name: "Chevrolet",
      model: "12-12",
      picture: Car4,
      date_recieved: "31/03/2021",
      collection_date: "02/04/2021",
      color: "Blue",
      status: "active",
      owner_name: "Kareem Salam",
      owner_phone: "+323442342",
      cost: "",
    },
  ];
  return (
    <div className="screen">
      <div className="cars_header_div">
        <button onClick={()=>history.push('/cars/new')}>Add New</button>
        <h4 onClick={()=>history.push('/cars/completed')}>Completed (2)</h4>
      </div>
      <div className=" car__main_div">
        <div className="list_active_cars">
          <p>Active Cars (4)</p>
          <div>
            {data.map((d) => (
              <Car key={d.name} data={d} select={select} />
            ))}
          </div>
        </div>
        <div className="selected_cars">
          <div className="img_holder">
            {selected.picture ? <img alt="image" src={selected.picture} /> : ""}
          </div>
          {selected.picture ? (
            <div className="car_data">
              <p>Name: {selected.name}</p>
              <p>Model: {selected.model}</p>
              <p>Color: {selected.color}</p>
              <p>Owner's Name: {selected.owner_name}</p>
              <p>Owner's Phone: {selected.owner_phone}</p>
              <p>Date Recieved: {selected.date_recieved}</p>
              <p>Collection Date: {selected.collection_date}</p>
              <p>Status: {selected.status}</p>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default Cars;
