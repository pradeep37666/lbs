import React from 'react'
import './NavBar.css'
import { Link, useHistory } from 'react-router-dom'
import Logo from '../../../assets/Logos/LBS_Logo_Flat_White.png'

const NavBar = () => {
    const history = useHistory()
    return (
        <div className='nav_bar_container'>
            <div className='register_bar_container'>
                <p 
                    className='register_title'
                    onClick={() => history.push('/register')}
                >
                    Sign Up
                </p>
                <p 
                    className='register_title'
                    onClick={() => history.push('/login')}
                >
                    Login
                </p>
            </div>
            <div className='nav_bar_box'>
                <Link to='/'>
                    <img 
                        src={Logo}
                        className='nav_bar_logo'
                    />
                </Link>
            </div>
        </div>
    )
}

export default NavBar