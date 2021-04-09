import React, { useState, useEffect } from "react";
import { db } from "../../firebase";

function Service({ customer }) {
  const [services, setServices] = useState([]);
  const [serviceName, setServiceName] = useState("Engine Replacement");
  const [cost, setCost] = useState("");
  const [cust, setCust] = useState("")

  const orderService = async (e)=>{
    e.preventDefault();
    const data = {
      cost,
      name: serviceName,
      type: "service",
      customer: cust
    }
    console.log(data)
  }

  useEffect(()=>{
    setCust(customer)
  },[customer])

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
        <form onSubmit={(e)=>orderService(e)}>
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
            type='submit'
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
