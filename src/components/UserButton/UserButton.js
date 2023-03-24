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
import { Avatar, Badge, styled } from '@material-ui/core'
import { isMobile } from 'react-device-detect'
import { CometChat } from '@cometchat-pro/chat'
import { useHistory } from 'react-router'

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#b03b4b',
    color: '#b03b4b',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      border: '1px solid currentColor',
      content: '""',
    },
  },
}))

export default function UserButton() {
  const { state, dispatch } = useGlobalState()
  const { user, unReadMessageCount } = state
  const firstName = user.firstName
  const history = useHistory()

  const [menuOpen, setMenuOpen] = useState(false)
  const handleLogout = async () => {
    localStorage.removeItem('LBSToken')
    dispatch({ type: 'setUser', data: null })
    await CometChat.logout()
    history.push({ pathname: '/' })
  }

  return (
    <div className='UserButton__Container'>
      <button
        className={`UserButton ${menuOpen ? 'UserButton--Active' : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {unReadMessageCount > 0 ? (
          <StyledBadge
            overlap='circular'
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            variant='dot'
          >
            <Avatar
              src={`${!user.avatar ? MissingProfile : getImage(user.avatar)}`}
              className='UserButton_ProfilePicture'
              alt='ProfilePicture'
            />
          </StyledBadge>
        ) : (
          <Avatar
            src={`${!user.avatar ? MissingProfile : getImage(user.avatar)}`}
            className='UserButton_ProfilePicture'
            alt='ProfilePicture'
          />
        )}
        {!isMobile && <div className='UserButton__FirstName'>{firstName}</div>}
        <KeyboardArrowDownIcon />
      </button>

      <div
        className={`UserButton__Menu__Wrapper ${
          menuOpen ? 'UserButton__Menu--Active' : ''
        }`}
      >
        <div className={`UserButton__Menu`} onClick={e => e.stopPropagation()}>
          <Link to='/user/trades'>
            <div>
              <Trades height='28px' width='50px' />
              Trades
            </div>
          </Link>

          <hr className='hr__UserMenu' />

          <Link to='/user/messages'>
            <div>
              <Messages height='28px' width='50px' />
              Messages
            </div>
          </Link>

          {user.isLender && (
            <>
              <hr className='hr__UserMenu' />
              <Link to='/user/your_shed'>
                <div>
                  <YourShed height='28px' width='50px' />
                  Your Shed
                </div>
              </Link>
              <hr className='hr__UserMenu' />

              <Link to='/postitem'>
                <div>
                  <PostItem height='28px' width='50px' />
                  Post an Item
                </div>
              </Link>
            </>
          )}
          <hr className='hr__UserMenu' />

          <Link to='/user/favourites'>
            <div>
              <Favourites height='28px' width='50px' />
              Favourites
            </div>
          </Link>
          <hr className='hr__UserMenu' />

          <Link to='/user/account'>
            <div>
              <Account height='28px' width='50px' />
              Account
            </div>
          </Link>

          {isMobile && (
            <div
              className='LogoutButton UserButtonLogout'
              onClick={() => handleLogout()}
            >
              Logout
            </div>
          )}
        </div>
      </div>

      {menuOpen ? (
        <div
          className='UserButton__Menu__CloseWrapper'
          onClick={() => setMenuOpen(false)}
        />
      ) : (
        ''
      )}
    </div>
  )
}
