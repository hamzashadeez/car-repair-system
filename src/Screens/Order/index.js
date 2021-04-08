import React, { useState, useEffect } from "react";
import "./styles.css";
import OrderItemList from "./OrderItemList";
import ProductForm from "./ProductForm";
import Service from "./Service";
import { db } from "../../firebase";
import NewCustomer from './Modals/newCustomer';
import NewService from './Modals/NewService'

const Order = () => {
  const [orderType, setOrderType] = useState("service");
  const [orders, setOrder] = useState([]);

  //Modals
  const [newCustomerModal, setNewCustomerModal] = useState(false)
  const [newServiceModal, setNewServiceModal] = useState(false)

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


  const handleClose = ()=>{
    setNewCustomerModal(false)
  }

  const hideService = ()=>{
    setNewServiceModal(false)
  }
  return (
    <div className="screen">
      {/* Modals */}
      <NewCustomer
         show={newCustomerModal}
         onHide={handleClose}
         handleClose={handleClose}
      />
      <NewService
        show ={newServiceModal}
        onHide={()=>hideService()}
        hideService={hideService}
      />
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
            <hr style={{border: "1px solid #8a3b47"}}></hr>

            <div className="configs_div">
                <button type='button' style={{background: 'seagreen'}} onClick={()=>setNewCustomerModal(true)}>Add New Customer</button>
                <button type='button' style={{background: 'dodgerblue'}} onClick={()=>setNewServiceModal(true)}>Add New Service</button>
            </div>
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
              color: "#8a3b47"
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
