import React, { useReducer, useEffect, useState } from 'react'
import { createBrowserHistory } from 'history'
import * as Sentry from '@sentry/react'
import { BrowserTracing } from '@sentry/tracing'
import './App.css'

import Top from './pages/marketing/Top/Top'
import LendYourStuff from './pages/marketing/LendYourStuff/LendYourStuff'
import RentStuff from './pages/marketing/RentStuff/RentStuff'
import HowItWorks from './pages/marketing/HowItWorks/HowItWorks'
import AboutUs from './pages/marketing/AboutUs/AboutUs'
import Blog from './pages/marketing/Blog/Blog'
import Protection from './pages/marketing/Protection/Protection'
import FAQs from './pages/marketing/FAQs/FAQs'
import ContactUs from './pages/marketing/ContactUs/ContactUs'

import Home from './pages/home/home.js'
import ItemPage from './pages/item/item.js'
import Search from './pages/search/search'
import Login from './pages/login/login'
import RegisterPage from './pages/register/register.js'
import AccountPage from './pages/account/account.js'
import PostItem from './pages/postitem/postitem'
import TradesPage from './pages/trades/trades.js'
import Messages from './pages/messages/Messages.js'
import YourshedPage from './pages/yourshed/yourshed.js'
import FavouritesPage from './pages/favourites/favourites.js'
import UpgradeLender from './pages/account/UpgradeLender/UpgradeLender'
import UpdatePassword from './pages/account/UpdatePassword/UpdatePassword'
import ScrollToTop from './util/ScrollToTop'
import Application from './pages/application/Application'
import InvalidRoutePage from './pages/InvalidRoutePage'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
} from "react-router-dom"
import reducer from './util/reducers/globalStateReducer'
import snackbarReducer from './util/reducers/snackbarReducer'
import { CometChat } from '@cometchat-pro/chat'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import EditItemPage from './pages/editItem/EditItemPage'
import Instance from './util/axios'
import ForgotPassword from './pages/ForgotPassword/ForgotPassword'
import LBSSnackBar from './components/LBSSnackBar/LBSSnackBar'
import LenderShed from './pages/lender-shed/lender-shed'

const SentryRoute = Sentry.withSentryRouting(Route)
const history = createBrowserHistory()
Sentry.init({
  integrations: [
    new BrowserTracing({
      routingInstrumentation: Sentry.reactRouterV5Instrumentation(history),
    }),
  ],
  tracesSampleRate: 1.0,
})

export const GlobalStateContext = React.createContext()
export const GlobalErrorContext = React.createContext()

const initialState = {}
const initialErrorState = {
  toggleSnackbar: false,
  snackbarMessage: '',
  snackbarBtnText: '',
  snackbarBtnFunc: () => {}
}

// const stripe = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)
const stripe = loadStripe('pk_test_51JAi4wAaysFIruTL4KcRCjRZ1aSi6KYbnBDjGRkKuuht6nojLH2ItABIh430Ee9nHzbnqgm80dlwWJZfXMLrbATw00fg4d8m5c')

function App() {
  const [ state, dispatch ] = useReducer(reducer, initialState)
  const [ errorState, errorDispatch ] = useReducer(snackbarReducer, initialErrorState)
  const [ loadingUser, setLoadingUser ] = useState(true)
  const { user } = state
  const token = localStorage.getItem('LBSToken')

  useEffect(() => {
    if (!token) {
      setLoadingUser(false)
      return
    } 
    setupCometChat()
    getCurrentUser()
  }, [])
  
  useEffect(() => {
    user && getUnReadMessageCount()
  },[user])

  const getCurrentUser = async () => {
    try{
      const { data } = await Instance.get('/users/me')
      dispatch({ type: 'setUser', data })
    } catch(err) {
      localStorage.removeItem('LBSToken')
    } finally {
      setLoadingUser(false)
    }
  }

  const setupCometChat = () => {
    const appId = process.env.REACT_APP_CHAT_APP_ID
    let cometChatSettings = new CometChat.AppSettingsBuilder().subscribePresenceForAllUsers().setRegion('us').build();
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

  const getUnReadMessageCount = async () => {
    try {
      const cometUser = await CometChat.getUser(user?.id)
      if (!cometUser) return
      const countObject = await CometChat.getUnreadMessageCount()
      if (typeof Object.values(countObject?.users)[0] === 'undefined') return
      dispatch({
        type: 'setUnReadMessageCount',
        data: Object.values(countObject?.users)[0]
      })
    } catch (error) {
      console.log({error})
    } 
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
            ? <Redirect to={{ pathname: '/user/account', state: { from: props.location } }} />
            : <Component {...props} />}
      />
    )
  }

  function RedirectBecomeLender({ component: Component, ...rest }) {
    return (
      <Route
        {...rest}
        render={(props) =>
          user && user.isLender
            ? <Redirect to={{ pathname: '/user/account', state: { from: props.location } }} />
            : <Component {...props} />}
      />
    )
  }

  return (
    <Elements stripe={stripe}>
      <GlobalErrorContext.Provider value={{errorState, errorDispatch}}>
      <GlobalStateContext.Provider value={{ state, dispatch }}>
        {loadingUser ? '' : 
        <Router history={history}>
          <LBSSnackBar timeout={10000}/>
          <ScrollToTop>
            {/* marketing pages here with different routers */}
            <SentryRoute exact path='/' component={Top} />
            <SentryRoute exact path='/lend_your_stuff' component={LendYourStuff} />
            <SentryRoute exact path='/rent_stuff' component={RentStuff} />
            <SentryRoute exact path='/how_it_works' component={HowItWorks} />
            <SentryRoute exact path='/about_us' component={AboutUs} />
            <SentryRoute exact path='/blog' component={Blog} />
            <SentryRoute exact path='/protection' component={Protection} />
            <SentryRoute exact path='/faqs' component={FAQs} />
            <SentryRoute exact path='/contact_us' component={ContactUs} />

            <SentryRoute exact path="/home" component={Home} />
            <SentryRoute exact path="/item/:itemId" component={ItemPage} />
            <SentryRoute exact path="/search/:searchParams?" component={Search} />
            <SentryRoute exact path="/forgotpassword" component={ForgotPassword} />
            <AuthRoute exact path="/item/edit/:itemId" component={EditItemPage} />
            <AuthRoute path="/user/trades" component={TradesPage} />
            <AuthRoute path="/user/messages" component={Messages} />
            <AuthRoute path="/user/your_shed" component={YourshedPage} />
            <AuthRoute path="/user/favourites" component={FavouritesPage} />
            <AuthRoute path="/user/account" component={AccountPage} />
            <AuthRoute path="/user/update_password" component={UpdatePassword} />
            {/* if the user is already a lender they should be unable to access the upgrade to lender page */}
            <RedirectBecomeLender path="/user/upgrade_to_lender" component={UpgradeLender} />
            <AuthRoute path="/item/:itemId/application" component={Application} />

            {/* post an item */}
            <AuthRoute path="/postitem" component={PostItem}/>

            {/* Lender Shed */}
            <AuthRoute path="/lender-shed/:lenderId" component={LenderShed}/>

            {/* Routes for login/register should redirect to user page if user is logged in */}
            <AuthRedirectRoute path="/login" component={Login} />
            <Route path="/register" component={RegisterPage} />
            
            {/* <Route path="*" component={<Redirect to={{ pathname: '/' }}/>}/> */}

          </ScrollToTop>
        </Router>
        }
      </GlobalStateContext.Provider>
      </GlobalErrorContext.Provider>
    </Elements>
  )
}

export default App;