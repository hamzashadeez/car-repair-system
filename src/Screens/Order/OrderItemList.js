import React from 'react'
import './styles.css'

function OrderItemList({data, id}) {
    return (
        <div className='OrderItemList'>
            <h6>{data.name}</h6>
            <p className='order_type'>Type: {data.type}</p>
            <p className='order_status'>Status: {data.status}</p>
        </div>
    )
}

export default OrderItemList
