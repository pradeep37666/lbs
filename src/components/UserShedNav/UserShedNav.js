import React, { useState } from 'react'
import './UserShedNav.css'
import {ReactComponent as Trades} from '../../assets/Icons/Trades.svg'
import {ReactComponent as Messages} from '../../assets/Icons/Messages.svg'
import {ReactComponent as YourShed} from '../../assets/Icons/YourShed.svg'
import {ReactComponent as Favourites} from '../../assets/Icons/FavouritesIcon.svg'
import {ReactComponent as Account} from '../../assets/Icons/Account.svg'
import { Link } from 'react-router-dom'
import { LogoutUser } from '../../util/UserStore'
import { useHistory } from 'react-router-dom'

export default function UserShedNav() {

    const urlArr = window.location.href.split("/")
    const url = urlArr[urlArr.length-1]
    const history = useHistory() 

    const [activeMain, setActiveMain] = useState(url)
    const [activeSecondary, setActiveSecondary] = useState()

    const handleLogout = () => {
        LogoutUser()
        history.push({pathname: '/'})
    }

    return (
        <div className="UserShedNav">
            <Link to='/user/trades'>
                <div className={`UserShedNav__LinkFlex ${activeMain === 'trades' ? 'UserShedNav__LinkFlex--Active' : ''}`} onClick={() => setActiveMain('trades')}>
                    <Trades height="50px" width="50px" className="UserShedNav__Icon"/>
                    Trades
                </div>
            </Link>

            <Link to='/user/messages'>
                <div className={`UserShedNav__LinkFlex ${activeMain === 'messages' ? 'UserShedNav__LinkFlex--Active' : ''}`} onClick={() => setActiveMain('messages')}>
                    <Messages height="50px" width="50px" className="UserShedNav__Icon"/>
                    Messages
                </div>
            </Link>

            <Link to='/user/your_shed'>
                <div className={`UserShedNav__LinkFlex ${activeMain === 'your_shed' ? 'UserShedNav__LinkFlex--Active' : ''}`} onClick={() => setActiveMain('your_shed')}>
                    <YourShed height="50px" width="50px" className="UserShedNav__Icon"/>
                    Your Shed
                </div>
            </Link>

            <Link to='/user/favourites'>
                <div className={`UserShedNav__LinkFlex ${activeMain === 'favourites' ? 'UserShedNav__LinkFlex--Active' : ''}`} onClick={() => setActiveMain('favourites')}>
                    <Favourites height="50px" width="50px" className="UserShedNav__Icon"/>
                    Favourites
                </div>
            </Link>

            <Link to='/user/account'>
                <div className={`UserShedNav__LinkFlex ${activeMain === 'account' ? 'UserShedNav__LinkFlex--Active' : ''}`} onClick={() => setActiveMain('account')}>
                    <Account height="50px" width="50px" className="UserShedNav__Icon"/>
                    Account
                </div>
            </Link>


            <div>
                extra links go here
            </div>

            <button className="LogoutButton" onClick={() => handleLogout()}>
                <YourShed height='40px' width='40px' style={{marginRight: '1em'}}/>
                Logout
            </button>

        </div>
    )
}
