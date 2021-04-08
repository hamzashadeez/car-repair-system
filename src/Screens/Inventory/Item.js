import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import { db } from "../../firebase";
import { useHistory } from "react-router-dom";

function Item(props) {
  const { data, id } = (props.location && props.location.state) || {};
  const { name, price, stock, category } = data || {};
  const history = useHistory();

  const [pName, setPName] = useState("");
  const [pPrice, setPPrice] = useState("");
  const [pStock, setPStock] = useState("");
  const [pCategory, setPCategory] = useState("");

  const [categoryO, setCategory] = useState([]);

  useEffect(() => {
    setPName(name);
    setPPrice(price);
    setPStock(stock);
    setPCategory(category);
  }, []);

  useEffect(() => {
    (async () => {
      db.collection("categories").onSnapshot((snapshot) => {
        setCategory(
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

  const updateProduct = async (e) => {
    e.preventDefault();
    let updateData = {
      name: pName,
      price: parseInt(pPrice),
      stock: parseInt(pStock),
      category: pCategory,
    };
    await db
      .collection("inventory")
      .doc(id)
      .update(updateData)
      .then(() => {
        alert("Update is Successful");
        // setNewCategory("")
        history.push("/inventory");
      })
      .catch(() => {
        console.log("something went wrong");
      });
  };

  const deleteProduct = async () => {
    await db
      .collection("inventory")
      .doc(id)
      .delete()
      .then(() => {
        alert("A product is deleted");
        // setNewCategory("")
        history.push("/inventory");
      })
      .catch(() => {
        console.log("something went wrong");
      });
  };
  return (
    <div className="screen">
      <div className="item__div">
        <div className="item_details">
          <div style={{ position: "absolute", top: 10 }}>
            <Link className="btnLink" to="/inventory">
              Go back
            </Link>
          </div>
          <h3>Product Name: {name}</h3>
          <h3>Selling Price: {price}</h3>
          <h3>Stock Remain: {stock}</h3>
          <h3>Category: {category}</h3>
          {/* <h3>product ID: {id}</h3> */}
        </div>
        <div className="item_configs">
          <form onSubmit={(e) => updateProduct(e)}>
            <p>Delete or Edit Product Details</p>
            <input
              value={pName}
              onChange={(e) => setPName(e.target.value)}
              placeholder="Product Name"
              required
            />
            <input
              value={pPrice}
              onChange={(e) => setPPrice(e.target.value)}
              placeholder="Product Price"
              required
            />
            <input
              value={pStock}
              onChange={(e) => setPStock(e.target.value)}
              placeholder="Stock"
              required
            />
            <select
              className="myselect"
              required
              style={{width: '230px'}}
              onChange={(e) => setPCategory(e.target.value)}
            >
              {categoryO.map(({ id, data }) => (
                <option key={id}>{data.name}</option>
              ))}
            </select>

            <div>
              <button type="submit">Update</button>
              <button
                onClick={() => deleteProduct()}
                type="button"
                style={{ background: "orange" }}
              >
                Delete
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Item;
