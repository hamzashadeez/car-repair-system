import React, {useState} from 'react'
import './style.css'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function Schedule() {
    const [value, setValue] = useState(new Date())
    return (
        <div className="screen">
            <h5>Schedule</h5>
            <div className='calen'>
            <Calendar
                onChange={setValue}
                value={value}
                />
                <div className='schedule'>
                    <div className='Day'>{value.toString()}</div>
                    <h4 className='no_schedule'>
                        No any schedule for today
                    </h4>
                </div>
            </div>
        </div>
    )
}

export default Schedule
