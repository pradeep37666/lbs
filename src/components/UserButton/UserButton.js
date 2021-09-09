import React, { useState } from 'react'
import './UserButton.css'
import MissingProfile from '../../assets/Icons/MissingProfileIcon.png'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import { ReactComponent as Trades } from '../../assets/Icons/Trades.svg'
import { ReactComponent as Messages } from '../../assets/Icons/Messages.svg'
import { ReactComponent as YourShed } from '../../assets/Icons/YourShed.svg'
import { ReactComponent as PostItem } from '../../assets/Icons/PostItem.svg'
import { ReactComponent as Favourites } from '../../assets/Icons/FavouritesIcon.svg'
import { ReactComponent as Account } from '../../assets/Icons/Account.svg'
import { Link } from 'react-router-dom'
import useGlobalState from '../../util/useGlobalState'
import getImage from '../../util/getImage'
import { Avatar } from '@material-ui/core'

export default function UserButton() {
    const { state } = useGlobalState()
    const { user } = state
    console.log('user', user)
    const firstName = user.fullName.split(" ")[0]

    const [menuOpen, setMenuOpen] = useState(false)

    return (
        <div className="UserButton__Container">
            <button className={`UserButton ${menuOpen ? 'UserButton--Active' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>

                <Avatar src={`${!user.avatar ? MissingProfile : getImage(user.avatar)}`} className="UserButton_ProfilePicture" alt="ProfilePicture" />

                <div className="UserButton__FirstName">{firstName}</div>

                <KeyboardArrowDownIcon />

            </button>

            <div className={`UserButton__Menu__Wrapper ${menuOpen ? 'UserButton__Menu--Active' : ''}`}>
                <div className={`UserButton__Menu`} onClick={(e) => e.stopPropagation()}>
                
                        <Link to='/user/trades'>
                            <div>
                                <Trades height="28px" width="50px"/>
                                Trades
                            </div>
                        </Link>
                        
                        <hr className="hr__UserMenu" />
                        
                        <Link to='/user/messages'>
                            <div>
                                <Messages height="28px" width="50px"/>
                                Messages
                            </div>
                        </Link>
                        <hr className="hr__UserMenu" />

                        <Link to='/user/your_shed'>
                            <div>
                                <YourShed height="28px" width="50px"/>
                                Your Shed
                            </div>
                        </Link>
                        <hr className="hr__UserMenu" />

                        <Link to='/postitem'>
                            <div>
                                <PostItem height="28px" width="50px"/>
                                Post an Item
                            </div>
                        </Link>
                        <hr className="hr__UserMenu" />

                        <Link to='/user/favourites'>
                            <div>
                                <Favourites height="28px" width="50px"/>
                                Favourites
                            </div>
                        </Link>
                        <hr className="hr__UserMenu" />

                        <Link to='/user/account'>
                            <div>
                                <Account height="28px" width="50px"/>
                                Account
                            </div>
                        </Link>
                        
                </div>
            </div>


            {menuOpen ? <div className="UserButton__Menu__CloseWrapper" onClick={() => setMenuOpen(false)} /> : ''}



        </div>

    )
}
