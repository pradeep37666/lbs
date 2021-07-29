import React, { useState } from 'react'
import './UserButton.css'
import { GetUser } from '../../util/UserStore'
import MissingProfile from '../../assets/Icons/MissingProfileIcon.png'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import {ReactComponent as Favourites} from '../../assets/Icons/FavouritesIcon.svg'

export default function UserButton() {
    const user = GetUser()
    const firstName = user.fullName.split(" ")[0]

    const [menuOpen, setMenuOpen] = useState(false)

    return (
    <button className={`UserButton ${menuOpen ? 'UserButton--Active' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>

        <img src={`${!user.avatar ? MissingProfile : user.avatar}`} className="UserButton_ProfilePicture" alt="ProfilePicture"/>
      
        <div className="UserButton__FirstName">{firstName}</div>

        <KeyboardArrowDownIcon />

        <div className={`UserButton__Menu ${menuOpen ? 'UserButton__Menu--Active' : ''}`}>
            <div>
                <Favourites height="28px"/>
                Trades
            </div>
            <hr className="hr__UserMenu" />

            <div>
                <Favourites height="28px"/>
                Messages
            </div>
            <hr className="hr__UserMenu" />

            <div>
                <Favourites height="28px"/>
                Your Shed
            </div>
            <hr className="hr__UserMenu" />

            <div>
                <Favourites height="28px"/>
                Post an Item
            </div>
            <hr className="hr__UserMenu" />

            <div>
                <Favourites height="28px"/>
                Favourites
            </div>
            <hr className="hr__UserMenu" />

            <div>
                <Favourites height="28px"/>
                Account
            </div>
        </div>

      </button>
    )
}
