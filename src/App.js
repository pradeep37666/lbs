import React, { useReducer } from 'react';
import './App.css';
import Home from './pages/home/home.js';
import ItemPage from './pages/item/item.js';
import SearchPage from './pages/search/search.js';
import LoginPage from './pages/login/login.js';
import RegisterPage from './pages/register/register.js';
import AccountPage from './pages/account/account.js';
import TradesPage from './pages/trades/trades.js';
import MessagesPage from './pages/messages/messages.js';
import YourshedPage from './pages/yourshed/yourshed.js';
import FavouritesPage from './pages/favourites/favourites.js';
import UpgradeLender from './pages/account/UpgradeLender/UpgradeLender';
import UpdatePassword from './pages/account/UpdatePassword/UpdatePassword';
import ScrollToTop from './util/ScrollToTop';
import {
  HashRouter as Router,
  Route,
  Redirect
} from "react-router-dom";
import { GetUser } from './util/UserStore';
import reducer from './util/reducer'

export const GlobalStateContext = React.createContext()

// Can populate this inital state object with whatever we like
const initialState = {}

function App() {

  const [state, dispatch] = useReducer(reducer, initialState)

  function AuthRoute({ component: Component, ...rest }) {
    return (
      <Route
        {...rest}
        render={(props) => GetUser()
          ? <Component {...props} />
          : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />}
      />
    )
  }

  function AuthRedirectRoute({ component: Component, ...rest }) {
    return (
      <Route
        {...rest}
        render={(props) => GetUser()
          ? <Redirect to={{ pathname: '/', state: { from: props.location } }} />
          : <Component {...props} />}
      />
    )
  }

  function RedirectBecomeLender({ component: Component, ...rest }) {
    return (
      <Route
        {...rest}
        render={(props) => GetUser().bsb
          ? <Redirect to={{ pathname: '/user/account', state: { from: props.location } }} />
          : <Component {...props} />}
      />
    )
  }

  return (
    <GlobalStateContext.Provider value={{ state, dispatch }}>
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

          {/* post an item */}
          {/* <AuthRoute path="/postitem" component={postitem}/> */}

          {/* Routes for login/register should redirect to user page if user is logged in */}
          <AuthRedirectRoute path="/login" component={LoginPage} />
          <AuthRedirectRoute path="/register" component={RegisterPage} />
        </ScrollToTop>

      </Router>
    </GlobalStateContext.Provider>
  );
}

export default App;
