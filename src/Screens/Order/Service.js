import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import "./styles.css";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";

function Service({}) {
  const [services, setServices] = useState([]);
  const [serviceName, setServiceName] = useState("Engine Replacement");
  const [cost, setCost] = useState("");
  const [customer, setCustomer] = useState("");
  const [customers, setCustomers] = useState([]);
  const [model, setModel] = useState("");
  const [carName, setCarName] = useState("");
  const [cust, setCust] = useState("");

  const orderService = async (e) => {
    e.preventDefault();
    const data = {
      cost,
      name: serviceName,
      type: "service",
      customer,
      date: moment().format("DD/MM/YYYY"),
      carName,
      model,
      status: "Active",
    };
    await db
      .collection("orders")
      .doc(uuidv4())
      .set(data)
      .then(() => {
        alert("A new order is added");
        setCost("");
        setCarName("");
        setModel("")
      })
      .catch(() => {
        console.log("something went wrong");
      });
  };

  useEffect(() => {
    setCust(customer);
  }, [customer]);

  useEffect(() => {
    (async () => {
      db.collection("customers").onSnapshot((snapshot) => {
        setCustomers(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
    })();
  }, []);

  useEffect(() => {
    (async () => {
      db.collection("services").onSnapshot((snapshot) => {
        setServices(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
    })();
  }, []);
  return (
    <div>
      <div className="p_div">
        <h6>Enter Service Details</h6>
        <form onSubmit={(e) => orderService(e)}>
          <label className="myLabel3">Select Customer</label>
          <select
            value={customer}
            className="myselect2"
            onChange={(e) => {
              setCustomer(e.target.value);
              console.log(customer);
            }}
          >
            <option className="text-danger">Not selected</option>
            {customers.map(({ id, data }) => (
              <option value={id} key={id}>
                {data.name}
              </option>
            ))}
          </select>
          <label className="labelStyle">Choose Service needed</label>
          <select
            className="myselect2"
            required
            onChange={(e) => setServiceName(e.target.value)}
          >
            {services.map(({ id, data }) => (
              <option key={id}>{data.name}</option>
            ))}
          </select>
          <label className="labelStyle">Enter Car Name</label>
          <input
            className="myselect2"
            required
            value={carName}
            onChange={(e) => setCarName(e.target.value)}
            placeholder="Car Name"
            type="text"
          />
          <label className="labelStyle">Enter Car Model</label>
          <input
            className="myselect2"
            required
            value={model}
            onChange={(e) => setModel(e.target.value)}
            placeholder="Car Model"
            type="text"
          />
          <label className="labelStyle">Enter Service Cost</label>
          <input
            className="myselect2"
            required
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            placeholder="Service Cost"
            type="number"
          />
          <button
            className="myselect2"
            type="submit"
            style={{ color: "#fff", background: "seagreen" }}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Service;
