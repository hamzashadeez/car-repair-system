import React, { useState, useEffect } from "react";
import "./styles.css";
import OrderItemList from "./OrderItemList";
import ProductForm from "./ProductForm";
import Service from "./Service";
import { db } from "../../firebase";

const Order = () => {
  const [orderType, setOrderType] = useState("service");
  const [orders, setOrder] = useState([]);

  useEffect(() => {
    (async () => {
      db.collection("orders").onSnapshot((snapshot) => {
        setOrder(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
      // console.log(products);
    })();

    // questions.map((d) => console.log(d));
  }, []);
  return (
    <div className="screen">
      <div className="order__main_div">
        <div className="main_order">
          <form>
            <h2>Add new order</h2>
            <label>Select Customer</label>
            <select>
              <option>Customer</option>
              <option>Customer2</option>
            </select>
            <label>Choose Order Type</label>
            <select
              value={orderType}
              onChange={(e) => setOrderType(e.target.value)}
            >
              <option value="service">Service</option>
              <option value="product">Products</option>
            </select>
          </form>
          {/* side */}
          <div className="side__order">
            {orderType === "service" ? <Service /> : <ProductForm />}
          </div>
        </div>
        <div className="config_order">
          <h5
            style={{
              margin: 0,
              marginBottom: "10px",
              fontSize: "1rem",
              fontWeight: "500",
            }}
          >
            Orders
          </h5>


          {orders.map(({ id, data }) => (
            <OrderItemList key={id} id={id} data={data} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Order;
