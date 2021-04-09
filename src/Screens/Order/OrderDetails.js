import React, { useState, useEffect } from "react";
import "./order.css";
import {db} from '../../firebase'

function OrderDetails(props) {
  const [mechanics, setMechanics] = useState([]);
  const [mechanic, setMechanic] = useState('');
  const { data, id } = (props.location && props.location.state) || {};
  const { name, cost, quantity, type, carName, model, date } = data || {};

  const assign = async ()=>{
      if(mechanics !== "Not selected"){
        console.log(mechanic)
      }
  }

  useEffect(() => {
    (async () => {
      db.collection("mechanics").onSnapshot((snapshot) => {
        setMechanics(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
    })();
  }, []);
  return (
    <div className="screen">
      <div className="orderDetail_main">
        <div className="bigDiv">
          <h3>
            Product Name: <span style={{ color: "#8a3b47" }}>{name}</span>
          </h3>
          <h3>
            Selling Price: <span style={{ color: "#8a3b47" }}>{cost}</span>
          </h3>
          {quantity ? (
            <h3>
              Stock Remain: <span style={{ color: "#8a3b47" }}>{quantity}</span>
            </h3>
          ) : (
            ""
          )}
          <h3>
            Order Type:{" "}
            <span style={{ color: "#8a3b47" }}>{type.toUpperCase()}</span>
          </h3>
          {carName ? (
            <h3>
              Car Name: <span style={{ color: "#8a3b47" }}>{carName}</span>
            </h3>
          ) : (
            ""
          )}

          {model ? (
            <h3>
              Car Model: <span style={{ color: "#8a3b47" }}>{model}</span>
            </h3>
          ) : (
            ""
          )}
          {/* {date ? <h3>
            Date: <span style={{ color: "#8a3b47" }}>{date}</span>
          </h3>: ""} */}

          {type === "service" ? (
            <div className="assign_tasks">
              <h4>Assign Work to a mechanic</h4>
              <label>Choose a mechanic</label>
              <select onChange={(e)=>setMechanic(e.target.value)}>
                <option>Not selected</option>
                {mechanics.map(({ id, data }) => (
                  <option value={id} key={id}>{data.name}</option>
                ))}
              </select>
              <button className='btn btn-success ' onClick={()=>assign()}>Submit</button>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="smDiv">sm</div>
      </div>
    </div>
  );
}

export default OrderDetails;
