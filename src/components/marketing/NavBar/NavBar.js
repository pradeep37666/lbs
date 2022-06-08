import React, { useState } from 'react'
import './NavBar.css'
import { Link, useHistory } from 'react-router-dom'
import Logo from '../../../assets/Logos/LBS_Logo_Flat_White.png'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'

const NavBar = ({ selected }) => {
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
                <Link to='/top'>
                    <img 
                        src={Logo}
                        className='nav_bar_logo'
                    />
                </Link>
                <div className='link_title_box'>
                    <Link 
                        to='/lend_your_stuff' 
                        className={ selected === 'lend_your_stuff'
                            ? 'link_title selected'
                            : 'link_title'
                        }
                    >
                        Lend Your Stuff
                    </Link>
                    <Link 
                        to='/rent_stuff' 
                        className={ selected === 'rent_stuff'
                            ? 'link_title selected'
                            : 'link_title'
                        }
                    >
                        Rent Stuff
                    </Link>
                    <Link 
                        to='/how_it_works' 
                        className={ selected === 'how_it_works'
                            ? 'link_title selected'
                            : 'link_title'
                        }
                    >
                        How It Works
                    </Link>
                    <Link 
                        to='/about_us' 
                        className={ selected === 'about_us'
                            ? 'link_title selected'
                            : 'link_title'
                        }
                    >
                        About Us
                    </Link>
                    <div 
                        className={ selected === 'info_hub'
                            ? 'link_title selected'
                            : 'link_title'
                        }
                    >
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