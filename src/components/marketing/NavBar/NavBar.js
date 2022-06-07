import React, { useState } from 'react'
import './NavBar.css'
import { Link, useHistory } from 'react-router-dom'
import Logo from '../../../assets/Logos/LBS_Logo_Flat_White.png'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'

const NavBar = () => {
    const [ isInfoOpen, setIsInfoOpen ] = useState(false)
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
                <div className='link_title_box'>
                    <Link to='/lend_your_stuff' className='link_title'>
                        Lend Your Stuff
                    </Link>
                    <Link to='/rent_stuff' className='link_title'>
                        Rent Stuff
                    </Link>
                    <Link to='/how_it_works' className='link_title'>
                        How It Works
                    </Link>
                    <Link to='/about_us' className='link_title'>
                        About Us
                    </Link>
                    <div className='link_title'>
                        Info Hub
                        {isInfoOpen
                        ? <IoIosArrowUp className='link_title_icon' onClick={() => setIsInfoOpen(false)}/>
                        : <IoIosArrowDown  className='link_title_icon' onClick={() => setIsInfoOpen(true)}/>
                        }
                    </div>
                    {/* search bar here */}
                </div>
            </div>
        </div>
    )
}

export default NavBar