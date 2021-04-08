import React, {useState, useEffect} from 'react'
import './styles.css'
import {db} from  '../../firebase'


function ProductForm() {
    const [products, setProducts] = useState([])

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
    },[])
    return (
        <div>
            <div className='p_div'>
                <h6>Product Inputs</h6>
                <form>
                <label className='labelStyle'>Select Product</label>
                <select className='myselect2'>
                {products.map(({ id, data }) => (
                  <option key={id}>{data.name}</option>
                ))}
                </select>
                <label className='labelStyle'>Enter Product Quantity needed</label>
                <input className='myselect2' placeholder='quantity' type='number'/>
                <button className='myselect2' style={{color: "#fff", background: "seagreen"}}>Order</button>
                </form>
            </div>
        </div>
    )
}

export default ProductForm
