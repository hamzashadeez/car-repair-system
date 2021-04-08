import React from 'react'
import './styles.css'

function ProductForm() {
    return (
        <div>
            <div className='p_div'>
                <h6>Product Inputs</h6>
                <form>
                <select className='myselect2'>
                    <option>Glass</option>
                    <option>Door</option>
                </select>
                <input className='myselect3' placeholder='quantity' type='number'/>
                <button className='myselect2' style={{color: "#fff", background: "seagreen"}}>Order</button>
                </form>
            </div>
        </div>
    )
}

export default ProductForm
