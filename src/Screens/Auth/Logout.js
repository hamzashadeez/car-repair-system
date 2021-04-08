import React from 'react'
import './style.css'
import {useHistory} from 'react-router-dom'

function Logout() {
    const history = useHistory();

    const logmeOut = ()=>{
        alert("Logged Out")
    }
    return (
        <div className="screen">
            <div className='logout_main'>
                <div>
                    <h3 style={{marginTop: '40px'}}>Are you sure you want to log out?</h3>
                    <div className='logout_btns'>
                        <button style={{background: "orange"}} onClick={()=>logmeOut()}>Yes, Log me out</button>
                        <button onClick={()=>history.push('/')}>No, Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Logout
