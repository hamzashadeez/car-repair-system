import React, { useState, useEffect } from "react";
import "./styles.css";
import { db } from "../../firebase";
import { v4 as uuidv4 } from "uuid";

function ProductForm() {
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [customer, setCustomer] = useState("");
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState("")


  const submit = async (e)=>{
    let price, stock;
    e.preventDefault();
    products.map(p=>{
      if (p.data.name === product){
        price = parseInt(p.data.price);
        stock = p.data.stock;
      }
    })
    var d = new Date();
    await db
      .collection("orders")
      .doc(uuidv4())
      .set({
        quantity,
        customer,
        date: d,
        type: 'Product',
        cost: price * quantity,
        name:product,
        status: "Active",

      })
      .then(() => {
        alert("A new order is added");
        setQuantity("");
      })
      .catch(() => {
        console.log("something went wrong");
      });
  }

  useEffect(() => {
    (async () => {
      db.collection("inventory").onSnapshot((snapshot) => {
        setProducts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
    })();
  }, []);
  //get customers
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
  return (
    <div>
      <div className="p_div">
        <h6>Product Inputs</h6>
        <form onSubmit={(e)=>submit(e)}>
          <label className="myLabel3">Select Customer</label>
          <select
            value={customer}
            className="myselect2"
            required
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
          <label className="labelStyle">Select Product</label>
          <select className="myselect2" required onChange={(e)=>setProduct(e.target.value)}>
          <option className="text-danger">Not selected</option>
            {products.map(({ id, data }) => (
              <option key={id}>{data.name}</option>
            ))}
          </select>
          <label className="labelStyle">Enter Product Quantity needed</label>
          <input className="myselect2" required value={quantity} type='number' onChange={(e)=>setQuantity(e.target.value)} placeholder="quantity" type="number" />
          <button
            className="myselect2"
            style={{ color: "#fff", background: "seagreen" }}
          >
            Order
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProductForm;
