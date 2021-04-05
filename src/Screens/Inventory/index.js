import React from "react";
import "./style.css";

function Inventory() {
  return (
    <div className="screen">
      <div className="inventory">
          {/* main */}
        <div className="inv__main">
            {/* head */}
            <div className='head__inv'>
                <h4>List Of Products</h4>
                <div>
                    <p>Filter</p>
                    <select>
                        <option>Tools</option>
                        <option>Parts</option>
                    </select>
                </div>
            </div>
        </div>
        <div className="inv__sub">
          <div className='category__inv'>
            <label>Add a new Category</label>
            <form>
              <input required placeholder='new category'/>
              <button className='submit__btn' type='submit'>Submit</button>
            </form>
          </div>
          {/* Register Item */}
          <form className='register__item'>
          <label>Add new item</label>
          <select>
              <option className='option'>Tools</option>
              <option className='option'>Car Parts</option>
          </select>
          <input required placeholder='Product Name'/>
          <input type='number' required placeholder='Product Price'/>
          <input type='number' required placeholder='Quantity'/>
          <button className='submit__btn' type='submit'>Add Product</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Inventory;
