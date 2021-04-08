import React, { useState, useEffect } from "react";
import "./style.css";
import { db } from "../../firebase";
// import { v4 as uuidv4 } from 'uuid';
// import { uuid } from 'uuidv4';

const Product = ({ data }) => {
  return (
    <div className="inv__product">
      <p>{data.name}</p>
      <i class="fas fa-chevron-right"></i>
    </div>
  );
};

function Inventory() {
  const [products, setProducts] = useState([]);
  //Form Data
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [stock, setStock] = useState('')
  const [category, setCate] = useState('Tools')
  const [newCategory,setNewCategory] = useState("")


  const submit = async(e) =>{
    e.preventDefault();
    await db.collection("inventory").doc("hamzzz").set({name, price, stock, category})
    .then(()=>{
      alert("A new product is added")
      setName("");
      setPrice("");
      setStock("")
    }).catch(()=>{console.log("something went wrong")})
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
      console.log(products);
    })();

    // questions.map((d) => console.log(d));
  }, []);


  const addCategory = async(e)=>{
    e.preventDefault();
    await db.collection("categories").doc("hamzzza").set({name: newCategory})
    .then(()=>{
      alert("A new category is added")
      setNewCategory("")
    }).catch(()=>{console.log("something went wrong")})
  }
  return (
    <div className="screen">
      <div className="inventory">
        {/* main */}
        <div className="inv__main">
          {/* head */}
          <div className="head__inv">
            <h4>List Of Products</h4>
            <div>
              <p>Filter</p>
              <select>
                <option>Tools</option>
                <option>Parts</option>
              </select>
            </div>
          </div>
          {/* end of header */}
          <div className="body__env">
            {products.map(({ id, data }) => (
              <Product key={id} data={data} />
            ))}
          </div>
        </div>

        <div className="inv__sub">
          <div className="category__inv">
            <label>Add a new Category</label>
            <form onSubmit={(e)=>addCategory(e)}>
              <input value={newCategory} onChange={(e)=>setNewCategory(e.target.value)} required placeholder="new category" required/>
              <button className="submit__btn" type="submit">
                Submit
              </button>
            </form>
          </div>
          {/* Register Item */}
          <form onSubmit={(e)=>submit(e)} className="register__item">
            <label>Add new item</label>
            <select value={category} onChange={(e)=>setCate(e.target.value)}>
              <option className="option">Tools</option>
              <option className="option">Car Parts</option>
            </select>
            <input value={name} onChange={(e)=>setName(e.target.value)} required placeholder="Product Name" />
            <input value={price} onChange={(e)=>setPrice(e.target.value)} type="number" required placeholder="Product Price" />
            <input value={stock} onChange={(e)=>setStock(e.target.value)} type="number" required placeholder="Quantity/Stock" />
            <button className="submit__btn" type="submit">
              Add Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Inventory;
