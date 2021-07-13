import './App.css';
import Home from './pages/home/home.js';
import ItemPage from './pages/item/item.js';
import SearchPage from './pages/search/search.js';
import LoginPage from './pages/login/login.js';
import RegisterPage from './pages/register/register.js';
import ScrollToTop from './util/ScrollToTop';
import {
  HashRouter as Router,
  Route,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <ScrollToTop>
      <Route exact path="/" component={Home}/>
      <Route exact path="/item/:itemId" component={ItemPage}/>
      <Route exact path="/search/:searchParams" component={SearchPage}/>
      <Route exact path="/login" component={LoginPage}/>
      <Route exact path="/register" component={RegisterPage}/>
      </ScrollToTop>
      
    </Router>
  );
}

export default App;
