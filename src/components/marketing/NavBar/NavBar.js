import React, { useState } from 'react'
import './NavBar.css'
import { Link, useHistory } from 'react-router-dom'
import Logo from '../../../assets/Logos/LBS_Logo_Flat_White.png'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import { CgMenu } from 'react-icons/cg'
import SearchBar from '../SearchBar/SearchBar'
import MenuModal from '../MenuModal/MenuModal'

const NavBar = ({ selected }) => {
    const [ isInfoOpen, setIsInfoOpen ] = useState(false)
    const [ isMenuModalOpen, setIsMenuModalOpen ] = useState(false)
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
                <div className='nav_bar_left'>
                    <Link to='/home'>
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
                                ? 'info_hub_container selected'
                                : 'info_hub_container'
                            }
                            onClick={() => setIsInfoOpen(!isInfoOpen)}
                        >
                            <div className='info_hub_title'>
                                Info Hub
                                {isInfoOpen
                                ? <IoIosArrowUp 
                                    className='link_title_icon' 
                                    onClick={() => setIsInfoOpen(false)}
                                    />
                                : <IoIosArrowDown  
                                    className='link_title_icon' 
                                    onClick={() => setIsInfoOpen(true)}
                                    />
                                }
                            </div>
                            <div 
                                className={isInfoOpen
                                    ? 'nav_popup_opend'
                                    : 'nav_popup_closed'
                                }
                            >
                                <p
                                    className='option_blog'
                                    onClick={() => history.push('/blog')}
                                >
                                Blog
                                </p>
                                <p
                                    className='option_protection'
                                    onClick={() => history.push('/protection')}
                                >
                                Lender Protection
                                </p>
                                <p
                                    className='option_faqs'
                                    onClick={() => history.push('/faqs')}
                                >
                                FAQ’s
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='nav_bar_right'>
                    <SearchBar />
                </div>
                <CgMenu 
                    className='nav_bar_sm_menu'
                    onClick={() => setIsMenuModalOpen(true)}
                />
                <MenuModal 
                    open={isMenuModalOpen}
                    handleClose={() => setIsMenuModalOpen(false)}
                />
            </div>
        </div>
    )
}

export default NavBar