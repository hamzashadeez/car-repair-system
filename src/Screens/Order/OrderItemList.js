import React from 'react'
import './styles.css'
import {useHistory} from 'react-router-dom'

function OrderItemList({data, id}) {
    const history = useHistory()

    const openDetail = ()=>{
        history.push({
            pathname: "/orderdetail",
            state: { data, id },
          });
    }
    return (
        <div onClick={()=>openDetail()} className='OrderItemList'>
            <h6>{data.name}</h6>
            <p className='order_type'>Type: {data.type}</p>
            <p className='order_status'>Status: {data.status}</p>
        </div>
    )
}

export default OrderItemList
