import React from 'react'

function Service() {
    return (
        <div>
            <div className='p_div'>
                <h6>Enter Service Details</h6>
                <form>
                <select className='myselect2'>
                    <option>Glass</option>
                    <option>Door</option>
                </select>
                <input className='myselect3' placeholder='Service Cost' type='number'/>
                <button className='myselect2' style={{color: "#fff", background: "seagreen"}}>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Service
