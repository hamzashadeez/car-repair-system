import React, { useState, useEffect } from "react";
import {db} from  '../../firebase'
function Service() {
    const [services, setServices] = useState([])

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
            <div className='p_div'>
                <h6>Enter Service Details</h6>
                <form>
                <label className='labelStyle'>Choose Service needed</label>
                <select className='myselect2'>
                {services.map(({ id, data }) => (
                  <option key={id}>{data.name}</option>
                ))}
                </select>
                <label className='labelStyle'>Enter Service Cost</label>
                <input className='myselect2' placeholder='Service Cost' type='number'/>
                <button className='myselect2' style={{color: "#fff", background: "seagreen"}}>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Service
