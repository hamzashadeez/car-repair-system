import React from 'react'
import { Link } from 'react-router-dom'
import './style.css'

function Header() {
    return (
        <div className='menu__header'>
            <Link to='/'>Home</Link>
            <Link to='/profile'>Profile</Link>
            <Link to='/assignment'>Assignments</Link>
            <Link to='/logout'>Logout</Link>
        </div>
    )
}

export default Header
