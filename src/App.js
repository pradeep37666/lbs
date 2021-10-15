import React, { useReducer, useEffect, useState } from 'react';
import './App.css';
import Home from './pages/home/home.js';
import ItemPage from './pages/item/item.js';
import SearchPage from './pages/search/search.js';
import LoginPage from './pages/login/login.js';
import RegisterPage from './pages/register/register.js';
import AccountPage from './pages/account/account.js';
import PostItem from './pages/postitem/postitem';
import TradesPage from './pages/trades/trades.js';
import MessagesPage from './pages/messages/messages.js';
import YourshedPage from './pages/yourshed/yourshed.js';
import FavouritesPage from './pages/favourites/favourites.js';
import UpgradeLender from './pages/account/UpgradeLender/UpgradeLender';
import UpdatePassword from './pages/account/UpdatePassword/UpdatePassword';
import ScrollToTop from './util/ScrollToTop';
import Application from './pages/application/Application';
import {
  HashRouter as Router,
  Route,
  Redirect
} from "react-router-dom";
import reducer from './util/reducer'
import instance from './util/axios';
import { CometChat } from '@cometchat-pro/chat'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import EditItemPage from './pages/editItem/EditItemPage';

export const GlobalStateContext = React.createContext()

const initialState = {}

const stripe = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [loadingUser, setLoadingUser] = useState(true)
  const { user } = state
  const token = localStorage.getItem('token')

  useEffect(() => {
    if (!token) {
      setLoadingUser(false)
      return
    } 
    setupCometChat()
    instance.get('/user/me')
      .then(({ data }) => {
        dispatch({ type: 'setUser', data })
        setLoadingUser(false)
        return
      })
      .catch((e) => console.log(e))
  }, [])

  const setupCometChat = () => {
    const appId = process.env.REACT_APP_CHAT_APP_ID
    let cometChatSettings = new CometChat.AppSettingsBuilder().subscribePresenceForAllUsers().setRegion('us').build();
    console.log('settings', cometChatSettings)
    CometChat.init(appId, cometChatSettings)
    .then(
      () => {
        console.log("Initialization completed successfully");
       },
       error => {
        console.log("Initialization failed with error:", error);
      }
    );
  }

  function AuthRoute({ component: Component, ...rest }) {
    return (
      <Route
        {...rest}
        render={(props) =>
          user
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />}
      />
    )
  }

  function AuthRedirectRoute({ component: Component, ...rest }) {
    return (
      <Route
        {...rest}
        render={(props) =>
          user
            ? <Redirect to={{ pathname: '/', state: { from: props.location } }} />
            : <Component {...props} />}
      />
    )
  }

  function RedirectBecomeLender({ component: Component, ...rest }) {
    return (
      <Route
        {...rest}
        render={(props) =>
          user && user.bsb
            ? <Redirect to={{ pathname: '/user/account', state: { from: props.location } }} />
            : <Component {...props} />}
      />
    )
  }

  return (
    <Elements stripe={stripe}>
      <GlobalStateContext.Provider value={{ state, dispatch }}>
        {loadingUser ? '' : 
        
        <Router>
          <ScrollToTop>
            <Route exact path="/" component={Home} />
            <Route exact path="/item/:itemId" component={ItemPage} />
            <Route exact path="/search/:searchParams?" component={SearchPage} />

            <AuthRoute path="/user/trades" component={TradesPage} />
            <AuthRoute path="/user/messages" component={MessagesPage} />
            <AuthRoute path="/user/your_shed" component={YourshedPage} />
            <AuthRoute path="/user/favourites" component={FavouritesPage} />
            <AuthRoute path="/user/account" component={AccountPage} />
            <AuthRoute path="/user/update_password" component={UpdatePassword} />
            {/* if the user is already a lender they should be unable to access the upgrade to lender page */}
            <RedirectBecomeLender path="/user/upgrade_to_lender" component={UpgradeLender} />
            <AuthRoute path="/item/:itemId/application" component={Application} />

            {/* post an item */}
            <AuthRoute path="/postitem" component={PostItem}/>

            {/* Routes for login/register should redirect to user page if user is logged in */}
            <AuthRedirectRoute path="/login" component={LoginPage} />
            <AuthRedirectRoute path="/register" component={RegisterPage} />
          </ScrollToTop>

        </Router>

        }
        
      </GlobalStateContext.Provider>
    </Elements>
  );
}

export default App;