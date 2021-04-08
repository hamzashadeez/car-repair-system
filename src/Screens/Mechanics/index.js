import React, { useState, useEffect } from "react";
import "./style.css";
import NewMech from "./Modal/NewMech";
import { db } from "../../firebase";

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
  const [selected, setSelected] = useState({});
  const [addNewMechModal, setAddNewMechModal] = useState(false);
  const [mechanics, setMechanics] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");

  const hideModal = () => {
    setAddNewMechModal(false);
  };

  const select = (data) => {
    setSelected(data);
    setName(selected.name);
    setEmail(selected.email);
    setCode(selected.code);
   
  };

  useEffect(() => {
    (async () => {
      await db.collection("mechanics")
        .onSnapshot((snapshot) => {
          setMechanics(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        })
        
    })();
  }, []);

  useEffect(() => {
    // set value
    // setName(selected.name);
    // setEmail(selected?.email);
    // setCode(selected?.code);
  }, []);

  return (
    <div className="screen">
      <button
        className="btn btn-success ml-4"
        onClick={() => setAddNewMechModal(true)}
      >
        Add a new mechanic
      </button>
      <div className="flex__div">
        <NewMech show={addNewMechModal} onHide={hideModal} hide={hideModal} />
        <div className="mechanics__list__div">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <h6>Name: {selected.name}</h6>
            <h6>Email: {selected.email}</h6>
            <h6>Status: {selected.status?.toUpperCase()}</h6>
          </div>
          <div>
            {/* <form className="edit_mech">
              <h4>Mechanic Configs</h4>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Enter Name"
              />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                type="email"
                placeholder="Enter Email"
              />
              <input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                type="number"
                required
                placeholder="Enter Code"
              />
              <div>
                <button className="btn btn-success">Update</button>
                <button className="btn btn-danger">Delete</button>
              </div>
            </form> */}
          </div>
        </div>
        <div className="mechanics_div_profile">
          <h5>List of Mechanics ({mechanics.length})</h5>
          <div>
            {mechanics.map(({ id, data }) => (
              <ListItem key={id} data={data} select={select} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mechanics;
