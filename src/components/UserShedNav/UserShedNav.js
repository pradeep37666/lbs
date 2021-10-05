import React, { useState } from 'react'
import './UserShedNav.css'
import { ReactComponent as Trades } from '../../assets/Icons/Trades.svg'
import { ReactComponent as Messages } from '../../assets/Icons/Messages.svg'
import { ReactComponent as YourShed } from '../../assets/Icons/YourShed.svg'
import { ReactComponent as Favourites } from '../../assets/Icons/FavouritesIcon.svg'
import { ReactComponent as Account } from '../../assets/Icons/Account.svg'
import { ReactComponent as Logout } from '../../assets/Icons/LogoutIcon.svg'
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import useGlobalState from '../../util/useGlobalState'
import { CometChat } from '@cometchat-pro/chat'

export default function UserShedNav(props) {

    const urlArr = window.location.href.split("/")
    const url = urlArr[urlArr.length - 1]
    const history = useHistory()
    const { state, dispatch } = useGlobalState()
    const { user } = state

    const [activeMain, setActiveMain] = useState(url)

    const handleLogout = async () => {
        localStorage.removeItem('token')
        dispatch({ type: 'setUser', data: null })
        const res = await CometChat.logout()
        console.log('log out from comet chat', res)
        history.push({ pathname: '/' })
    }

    return (
        <div className="UserShedNav">
            <Link to='/user/trades'>
                <div className={`UserShedNav__LinkFlex ${activeMain === 'trades' ? 'UserShedNav__LinkFlex--Active' : ''}`} onClick={() => setActiveMain('trades')}>
                    <Trades height="50px" width="50px" className="UserShedNav__Icon" />
                    Trades
                </div>
            </Link>

            <Link to='/user/messages'>
                <div className={`UserShedNav__LinkFlex ${activeMain === 'messages' ? 'UserShedNav__LinkFlex--Active' : ''}`} onClick={() => setActiveMain('messages')}>
                    <Messages height="50px" width="50px" className="UserShedNav__Icon" />
                    Messages
                </div>
            </Link>

            <Link to='/user/your_shed'>
                <div className={`UserShedNav__LinkFlex ${activeMain === 'your_shed' ? 'UserShedNav__LinkFlex--Active' : ''}`} onClick={() => setActiveMain('your_shed')}>
                    <YourShed height="50px" width="50px" className="UserShedNav__Icon" />
                    Your Shed
                </div>
            </Link>

            <Link to='/user/favourites'>
                <div className={`UserShedNav__LinkFlex ${activeMain === 'favourites' ? 'UserShedNav__LinkFlex--Active' : ''}`} onClick={() => setActiveMain('favourites')}>
                    <Favourites height="50px" width="50px" className="UserShedNav__Icon" />
                    Favourites
                </div>
            </Link>

            <Link to='/user/account'>
                <div className={`UserShedNav__LinkFlex ${activeMain === 'account' ? 'UserShedNav__LinkFlex--Active' : ''}`} onClick={() => setActiveMain('account')}>
                    <Account height="50px" width="50px" className="UserShedNav__Icon" />
                    Account
                </div>
            </Link>

            {activeMain === 'account' ?
                <div>
                    <div>
                        <div className={`UserShedNav__SecondaryLink ${props.accountContent === 'Account' ? 'UserShedNav__SecondaryLink--active' : ''} UserShedNav__SecondaryLink__ExtraSpacing`} onClick={() => props.setAccountContent('Account')}>
                            Account & Settings
                            <ChevronRightIcon style={{ fill: '#b43b4c' }} />
                        </div>
                    </div>

                    <div className="HL" />
                    {console.log(user)}

                    {!user.bsb ?
                        <Link to='/user/upgrade_to_lender'>
                            <div>
                                <div className={`UserShedNav__SecondaryLink ${props.accountContent === 'Become a Lender' ? 'UserShedNav__SecondaryLink--active' : ''}`} onClick={() => props.setAccountContent('Become a Lender')}>
                                    Become Lender
                                    <ChevronRightIcon style={{ fill: '#b43b4c' }} />
                                </div>
                            </div>
                        </Link>
                        :
                        <div>
                            <div className={`UserShedNav__SecondaryLink ${props.accountContent === 'Availability' ? 'UserShedNav__SecondaryLink--active' : ''}`} onClick={() => props.setAccountContent('Availability')}>
                                Availability
                                <ChevronRightIcon style={{ fill: '#b43b4c' }} />
                            </div>
                        </div>}

                    {/* {!user.bsb ? <div className="HL" /> : ''} */}


                    <div className="HL" />
                    <div>
                        <div className={`UserShedNav__SecondaryLink ${props.accountContent === 'Terms & Conditions' ? 'UserShedNav__SecondaryLink--active' : ''}`} onClick={() => props.setAccountContent('Terms & Conditions')}>
                            Terms & Conditions
                            <ChevronRightIcon style={{ fill: '#b43b4c' }} />
                        </div>
                    </div>

                    <div className="HL" />
                    <div>
                        <div className={`UserShedNav__SecondaryLink ${props.accountContent === 'Support' ? 'UserShedNav__SecondaryLink--active' : ''}`} onClick={() => props.setAccountContent('Support')}>
                            Support
                            <ChevronRightIcon style={{ fill: '#b43b4c' }} />
                        </div>
                    </div>

                    <div className="HL" />
                </div>
                : ''}


            <button className="LogoutButton" onClick={() => handleLogout()}>
                <Logout height='40px' width='43px' style={{ marginRight: '1em' }} />
                Logout
            </button>

        </div>
    )
}