import './App.css';
import Home from './pages/home/home.js';
import ItemPage from './pages/item/item.js';
import SearchPage from './pages/search/search.js';
import LoginPage from './pages/login/login.js';
import RegisterPage from './pages/register/register.js';
import AccountPage from './pages/account/account.js';
import ScrollToTop from './util/ScrollToTop';
import {
  HashRouter as Router,
  Route,
  Redirect
} from "react-router-dom";
import { GetUser } from './util/UserStore';

// code for only allowing certain routes if user is authenticated
/* <Route path="/search" component={Search} onEnter={requireAuth} /> */



function App() {

  function AuthRoute ({component: Component, ...rest}) {
    return (
      <Route
        {...rest}
        render={(props) => GetUser()
          ? <Component {...props} />
          : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
      />
    )
  }

  function AuthRedirectRoute ({component: Component, ...rest}) {
    return (
      <Route
        {...rest}
        render={(props) => GetUser()
          // pathname to be user path ?? /user
          ? <Redirect to={{pathname: '/', state: {from: props.location}}} />
          : <Component {...props} />}
      />
    )
  }

  /* <AuthRoute path="/item/:itemId" component={ItemPage}/> */

  return (
    <Router>
      <ScrollToTop>
      <Route exact path="/" component={Home}/>
      <Route exact path="/item/:itemId" component={ItemPage}/>
      <Route exact path="/search/:searchParams?" component={SearchPage}/>

      <AuthRoute path="/user/trades" component={AccountPage}/>
      <AuthRoute path="/user/messages" component={AccountPage}/>
      <AuthRoute path="/user/your_shed" component={AccountPage}/>
      <AuthRoute path="/user/favourites" component={AccountPage}/>
      <AuthRoute path="/user/account" component={AccountPage}/>

      {/* post an item */}
      {/* <AuthRoute path="/postitem" component={postitem}/> */}

      {/* Routes for login/register should redirect to user page if user is logged in */}
      <AuthRedirectRoute path="/login" component={LoginPage}/>
      <AuthRedirectRoute path="/register" component={RegisterPage}/>
      </ScrollToTop>
      
    </Router>
  );
}

export default App;
