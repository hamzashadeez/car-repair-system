import React from 'react'
import './style.css'

const Car = ({data})=>{
    return(
        <div className='car'>
            {data.name}
        </div>
    )
}

function Cars() {
    const data = [
        {name: "Corolla", model: "12-12", picture: '', date_recieved: "31/03/2021", collection_date: "02/04/2021", color: '', status: "active", owner_name: "Habib yasir", owner_phone: "+323442342", cost: ''},
        {name: "BMW", model: "12-12", picture: '', date_recieved: "31/03/2021", collection_date: "02/04/2021", color: '', status: "active", owner_name: "Osman Alhasan", owner_phone: "+323442342", cost: ''},
        {name: "Cadillac", model: "12-12", picture: '', date_recieved: "31/03/2021", collection_date: "02/04/2021", color: '', status: "active", owner_name: "Mohammad Husain", owner_phone: "+323442342", cost: ''},
        {name: "Chevrolet", model: "12-12", picture: '', date_recieved: "31/03/2021", collection_date: "02/04/2021", color: '', status: "active", owner_name: "Kareem Salam", owner_phone: "+323442342", cost: ''},
    ]
    return (
        <div className="screen">
            <div className='cars_header_div'>
                <button>Add New</button>
                <h4>Completed (2)</h4>
            </div>            
            <div className=' car__main_div'>
                <div className='list_active_cars'>
                    <p>Active Cars (4)</p>
                    <div>
                        {data.map(d=><Car key={d.name} data={d} />)}
                    </div>
                </div>
                <div className='selected_cars'>
                    <div className='img_holder'></div>
                    <div className='car_data'></div>
                </div>
            </div>            
        </div>
    )
}

export default Cars
