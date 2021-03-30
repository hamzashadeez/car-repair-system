import React from 'react'
import './request.css'
import { useHistory } from "react-router-dom";

const ListItem = ({data})=>{
    return(
        <div className='request__list__item'>
            <div>{data.name}</div>
            <div className='btn__container'>
                <button className='btn green'>Accept</button>
                <button className='btn yellow'>Reject</button>
            </div>
        </div>
    )
}

function Requests() {
    let history = useHistory();
    const data = [
        {
          id: 1,
          name: "Hamza Shadeez",
          status: "active",
          email: "hamza@gmail.com",
        },
        {
          id: 2,
          name: "John Doe",
          status: "not active",
          email: "johndoe@gmail.com",
        },
        {
          id: 3,
          name: "Osman Yasir",
          status: "active",
          email: "osman1212@gmail.com",
        },
        { id: 4, name: "Amir Zain", status: "active", email: "amirzain@gmail.com" },
      ];

    return (
        <div className="screen">
            <h5 id='go_back' onClick={() => history.push("/mechanics")}>Go Back</h5>
            <div className='requests__div'>
                {data.map((d)=><ListItem key={d.id} data={d} />)}
            </div>
        </div>
    )
}

export default Requests
